<script>
    import { onMount } from 'svelte';
    import cytoscape from 'cytoscape';
    import JSON5 from 'json5';
    import graphData from '../../../graph.json';
  
    onMount(() => {
      const cy = cytoscape({
        container: document.getElementById('cy'),
        elements: transformDataToCytoscapeFormat(JSON5.parse(graphData)),
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
          name: 'grid', // You can change this to any layout you prefer
        }
      });
    });
  
    function transformDataToCytoscapeFormat(data) {
      let cyElements = [];
  
      if (data.nodes && Array.isArray(data.nodes)) {
        data.nodes.forEach(node => {
          cyElements.push({
            data: {
              id: node.id,
              label: node.label,
              // include other node properties here if needed
            }
          });
        });
      }
  
      if (data.links && Array.isArray(data.links)) {
        data.links.forEach(link => {
          cyElements.push({
            data: {
              id: `e-${link.source}-${link.target}`,
              source: link.source,
              target: link.target,
              // include other link properties here if needed
            }
          });
        });
      }
  
      return cyElements;
    }
  </script>
  
  <style>
    #cy {
      width: 800px;
      height: 600px;
      background-color: lightgrey;
    }
  </style>
  
  <div id="cy"></div>
  