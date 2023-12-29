<script lang="ts">
    import { onMount } from 'svelte';
    import cytoscape from 'cytoscape';
    import JSON5 from 'json5';
    import graphData from '../../../graph.json';

    let targetEl:HTMLDivElement

    type FooType = {
      label: string;
      url: string;
    };
    type Graph={ [key: string]: FooType[] }

    onMount(() => {
   
    console.log(targetEl)
      const cy = cytoscape({
        container: targetEl,
        elements: transformDataToCytoscapeFormat(graphData),
        style: [
          // Define your styles here
          {
            selector: 'node',
            style: {
              'background-color': '#666',
              'label': 'data(label)'
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
        }
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
        targets.forEach(({label, url}) => {
          // Add the target node if it's not already in the array
          if (!cyElements.some(el => el.data.id === url)) {
            cyElements.push({
              data: { id: url, label: label }
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
      min-height: 500px;
      background-color: lightgrey;
    }
  </style>

  <div class="cy" bind:this={targetEl}></div>
  