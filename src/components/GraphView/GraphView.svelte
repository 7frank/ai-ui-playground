<script lang="ts">
    import { onMount } from 'svelte';
    import cytoscape from 'cytoscape';
    import JSON5 from 'json5';

    let targetEl:HTMLDivElement

    type FooType = {
      label: string;
      url: string;
      type: "double-bracket" | "markdown" | "plain";
    };
    type Graph={ [key: string]: FooType[] }

    export let graph:Graph={}

    function estimateTextSize(text:string, fontSize:number) {
    // Rough estimation of text size
    return text.length * fontSize;
    }

    function getDisplayText(ele){
     return ele.data('label')??ele.data('id')
    }

  
    const colorMap:Record<FooType['type'],string>={
      'double-bracket': '666',
      markdown: '900',
      plain: '090'
    }

    onMount(() => {
   
      const cy = cytoscape({
        container: targetEl,
        elements: transformDataToCytoscapeFormat(graph),
        style: [
          // Define your styles here
          {
            selector: 'node',
            style: {
              'shape': 'rectangle', // Set the shape of the node to rectangle
              'border-radius': '3px', 
              'background-color': (ele)=> ele.data('id').startsWith("src/")?'#009':colorMap[ ele.data('type')],
              'opacity': 0.5,
        
              'label': (ele)  => getDisplayText(ele),
              'text-valign': 'center', // Vertical alignment
              'text-halign': 'center', // Horizontal alignment
              'text-margin-x': 10, // Horizontal padding-like effect
              'text-margin-y': 5, // Vertical padding-like effect
                

              'font-size': "12px", // Set your font size here
              'width': (ele)  => estimateTextSize(getDisplayText(ele), 8) + 'px',
              'height': ()=>'40px'
                
            }
          },
          {
            selector: 'edge',
            style: {
              'width': 3,
              'line-color': '#ccc',
              'target-arrow-color': '#ccc',
              'target-arrow-shape': 'triangle'
            }
          }
        ],
        layout: {
          name: 'cose', // You can change this to any layout you prefer
          nodeRepulsion: function( node ){ return 16500; }, // Increases repulsion between nodes
          idealEdgeLength: function( edge ){ return 100; }, // Adjusts the ideal length of the edges
   
        }
      });

        cy.on('tap', 'node', function(event) {
        var node = event.target;
        const data=node.data()
     

        // src/content/docs/ai/ann.md 
        // /ai-ui-playground/ai/ann/
        const url=data.id.startsWith("src/")?data.id.replace("src/content/docs","/ai-ui-playground").replace(".md","").replace(".mdx",""):data.id

        window.open(url, '_blank')

        });

    });
  
    function transformDataToCytoscapeFormat(data:Graph) {
      let cyElements = [];
  
      // Process each source node
      for (const [sourceId, targets] of Object.entries(data)) {
        // Add the source node
        cyElements.push({
          data: { id: sourceId }
        });

        // Add target nodes and edges
        targets.forEach(({label, url,type}) => {
          // Add the target node if it's not already in the array
          if (!cyElements.some(el => el.data.id === url)) {
            cyElements.push({
              data: { id: url, label: label,type:type }
            });
          }
  
          // Add the edge
          cyElements.push({
            data: {
              id: `e-${sourceId}-${url}`,
              source: sourceId,
              target: url
            }
          });
        });
      }
  
      return cyElements;
    }
  </script>
  
  <style>
    .cy {
      width: 100%;
      min-height: 1500px;
      background-color: lightgrey;
    }
  </style>

  <div class="cy" bind:this={targetEl}></div>
  