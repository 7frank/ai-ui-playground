<script lang="js">
    import { onMount } from 'svelte';
    import cytoscape from 'cytoscape';
    import JSON5 from 'json5';
    import graphData from '../../../graph.json';

    onMount(() => {
       const targetEl= document.getElementById('cy')

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
  
    function transformDataToCytoscapeFormat(data) {
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
    #cy {
      width: 100%;
      background-color: lightgrey;
    }
  </style>

  <div id="cy"></div>
  