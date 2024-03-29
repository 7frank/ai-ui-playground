<script lang="ts">
    import { onMount } from 'svelte';
    import cytoscape from 'cytoscape';
    import JSON5 from 'json5';
    import {performSearch,debounce} from './utils';

    let targetEl:HTMLDivElement
    let searchTerm = "";


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

    let cy :cytoscape.Core

    function resetStyle(){
            // Reset previously highlighted elements, if any
            cy.elements().removeClass('highlighted');
            
            // fade all not relevant nodes
            cy.elements().addClass('faded');

        }

        function highlightNodes(nodes)
        {
          // Highlight nodes 
          nodes.addClass('highlighted');

          // un-fade all relevant nodes
          nodes.removeClass('faded');  
        }

        function fitIntoView(nodes)
        {
          cy.animate({
                fit: {
                    eles: nodes,
                    padding: 50
                },
                duration: 1000, // duration in milliseconds
                easing: 'linear' // easing style, you can choose others like 'linear', 'ease-in', 'ease-out', etc.
            });
        }


    onMount(() => {
   
        cy = cytoscape({
        container: targetEl,
        elements: transformDataToCytoscapeFormat(graph),
        wheelSensitivity: 0.2,
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

            resetStyle()

            const els=node.neighborhood('node').add(node)
           
            // Highlight adjacent edges
            node.connectedEdges().addClass('highlighted');

            highlightNodes(els)

            cy.resize();

            fitIntoView(els)

        });

        cy.on('tap', 'edge', function(event) {
          const edge = event.target;

            // Retrieve the source and target nodes of the edge
            const sourceNode = edge.source();
            const targetNode = edge.target();
            const els = cy.collection().add(sourceNode).add(targetNode);

            resetStyle()

            edge.addClass('highlighted');

            highlightNodes(els)
            cy.resize();
            fitIntoView(els)

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


    function handleSearchChange(event) {
    searchTerm = event.target.value;
    const found=performSearch(cy,searchTerm,(n)=> getDisplayText(n));

    resetStyle()
    highlightNodes(found)
    cy.resize();
    fitIntoView(found)
    }

  </script>
  
  <style>
    .cy {
      width: 100%;
      min-height: 800px;
      background-color: lightgrey;
    }

    .abs-input{
      position:absolute;
      z-index: 1;
      top:1em;
      left:1em;
    }
  </style>

<div style="position:relative">
  <input class="abs-input" type="text" placeholder="Search nodes..." on:change={debounce(handleSearchChange,300)}>
  <div class="cy" bind:this={targetEl}></div>
</div>  