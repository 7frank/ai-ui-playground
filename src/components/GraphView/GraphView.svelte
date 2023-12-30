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


    function getDisplayText(ele){
     return ele.data('label')??ele.data('id')
    }

  
    const colorMap:Record<FooType['type'],string>={
      'double-bracket': '#666',
      markdown: '#933',
      plain: '#393'
    }

    const mLayout={
          name: 'cose', // You can change this to any layout you prefer
          nodeDimensionsIncludeLabels: true,
          //nodeRepulsion: function( node ){ return 16500; }, // Increases repulsion between nodes
          //idealEdgeLength: function( edge ){ return 100; }, // Adjusts the ideal length of the edges
   
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
              'shape': 'round-rectangle',
              'background-color': (ele)=> ele.data('id').startsWith("src/")?'#009':colorMap[ ele.data('type')],
              'opacity': 0.8,
              'label': (ele)  => getDisplayText(ele),
              'text-wrap': 'wrap',
              'text-valign': 'center', // Vertical alignment
              'text-halign': 'center', // Horizontal alignment           
              padding:"12px", 
              width: 'label',
              height: 'label',
              'font-size': "12px", // Set your font size here   
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
          },
           // Styles for highlighted nodes and edges
          {
              selector: 'node.highlighted',
              style: {
                  'border-width':"5px",
                  'border-color': '#fff', // Example: red background for highlighted nodes
                  // ... other styles for highlighted nodes
              }
          },
          {
              selector: 'node.faded',
              style: {
                 opacity:0.3
              }
          },
          {
              selector: 'edge.highlighted',
              style: {
                  'line-color': '#f00', // Example: red line for highlighted edges
                  // ... other styles for highlighted edges
              }
          }
        ],
        layout: mLayout
      });

        cy.on('dblclick', 'node', function(event) {
        var node = event.target;
        const data=node.data()
     

        // src/content/docs/ai/ann.md 
        // /ai-ui-playground/ai/ann/
        const url=data.id.startsWith("src/")?data.id.replace("src/content/docs","/ai-ui-playground").replace(".md","").replace(".mdx",""):data.id

        window.open(url, '_blank')

        });

        // Add click event listener to nodes
        cy.on('tap', 'node', function(event) {
            var node = event.target;

            // Reset previously highlighted elements, if any
            cy.elements().removeClass('highlighted');
            
            // fade all not relevant nodes
            cy.elements().addClass('faded');

            // Highlight the selected node
            node.addClass('highlighted');

            // Highlight adjacent nodes and edges
            node.connectedEdges().addClass('highlighted');
            node.neighborhood('node').addClass('highlighted');

            // un-fade all relevant nodes
            node.neighborhood('node').removeClass('faded');
            node.removeClass('faded');
            
            cy.resize();
            cy.fit(node.neighborhood('node'),50)

        });

        // Reset styles when clicking elsewhere
        cy.on('tap', function(event) {
            if (event.target === cy) {
                cy.elements().removeClass('highlighted');
                cy.elements().removeClass('faded');
            }
        });

        // TODO rerun force graph on partial nodes when dragged
        // cy.on('dragend', 'node', function(event) {

        //   var node = event.target; // the node that was dragged
        //   var neighborhood = node.closedNeighborhood(); // the node and its neighbors
        //   var layout = cy.layout({...mLayout, elements: neighborhood.elements()});
        //   layout.run();
        // });


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
  