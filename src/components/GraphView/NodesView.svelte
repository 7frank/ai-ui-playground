<script lang="ts">
  import { onMount } from 'svelte';
  import cytoscape from 'cytoscape';
import { performSearch, debounce } from './utils';

  let targetEl: HTMLDivElement;
  let searchTerm = "";

  type NodeType = {
      id: string;
      label?: string;
      group: number;
  };

  type LinkType = {
      source: string;
      target: string;
      relation: string;
      strength: number;
  };

  type Graph = {
      nodes: NodeType[];
      links: LinkType[];
  };

  export let graph: Graph = { nodes: [], links: [] };

  function getDisplayText(ele) {
      return ele.data('label') ?? ele.data('id');
  }

  const groupColorMap = {
      1: '#009',
      2: '#f00',
      3: '#0f0',
      4: '#00f',
      // Add more colors for other groups as needed
  };

  const mLayout = {
      name: 'cose',
      nodeDimensionsIncludeLabels: true,
  };

  let cy: cytoscape.Core;

  onMount(() => {
      cy = cytoscape({
          container: targetEl,
          elements: transformDataToCytoscapeFormat(graph),
          wheelSensitivity: 0.2,
          style: [
              {
                  selector: 'node',
                  style: {
                      'shape': 'round-rectangle',
                      'background-color': (ele) => groupColorMap[ele.data('group')],
                      'opacity': 0.8,
                      'label': (ele) => getDisplayText(ele),
                      'text-wrap': 'wrap',
                      'text-valign': 'center',
                      'text-halign': 'center',
                      'padding': '12px',
                      'width': 'label',
                      'height': 'label',
                      'font-size': '12px'
                  }
              },
              {
                  selector: 'edge',
                  style: {
                    'width': (ele) => ele.data('strength') * 10,
                      'line-color': '#ccc',
                      'target-arrow-color': '#ccc',
                      'target-arrow-shape': 'triangle',
                      'label': 'data(relation)',
                      'text-rotation': 'autorotate',
                      'text-margin-x': '4px',
                      'font-size': '10px',
                      'text-background-opacity': 1,
                      'text-background-color': '#fff',
                      'text-background-padding': '3px',
                      'edge-text-rotation': 'autorotate'
                  }
              },
              {
                  selector: 'node.highlighted',
                  style: {
                      'border-width': "5px",
                      'border-color': '#fff'
                  }
              },
              {
                  selector: 'node.faded',
                  style: {
                      'opacity': 0.3
                  }
              },
              {
                  selector: 'edge.highlighted',
                  style: {
                      'line-color': '#f00'
                  }
              }
          ],
          layout: mLayout
      });
      
      cy.on('dblclick', 'node', function(event) {
          var node = event.target;
          const data = node.data();
          const url = data.id;
          window.open(url, '_blank');
      });

      cy.on('tap', 'node', function(event) {
          var node = event.target;
          resetStyle();
          const els = node.neighborhood('node').add(node);
          node.connectedEdges().addClass('highlighted');
          highlightNodes(els);
          cy.resize();
          fitIntoView(els);
      });

      cy.on('tap', 'edge', function(event) {
          const edge = event.target;
          const sourceNode = edge.source();
          const targetNode = edge.target();
          const els = cy.collection().add(sourceNode).add(targetNode);
          resetStyle();
          edge.addClass('highlighted');
          highlightNodes(els);
          cy.resize();
          fitIntoView(els);
      });

      cy.on('tap', function(event) {
          if (event.target === cy) {
              cy.elements().removeClass('highlighted');
              cy.elements().removeClass('faded');
          }
      });
  });

  function transformDataToCytoscapeFormat(data: Graph) {
      let cyElements = [];
      data.nodes.forEach(node => {
          cyElements.push({
              data: { id: node.id, label: node.id, group: node.group }
          });
      });
      data.links.forEach(link => {
          cyElements.push({
              data: {
                  id: `e-${link.source}-${link.target}`,
                  source: link.source,
                  target: link.target,
                  relation: link.relation,
                  strength: link.strength
              }
          });
      });
      return cyElements;
  }

  function resetStyle() {
      cy.elements().removeClass('highlighted');
      cy.elements().addClass('faded');
  }

  function highlightNodes(nodes) {
      nodes.addClass('highlighted');
      nodes.removeClass('faded');
  }

  function fitIntoView(nodes) {
      cy.animate({
          fit: {
              eles: nodes,
              padding: 50
          },
          duration: 1000,
          easing: 'linear'
      });
  }

  function handleSearchChange(event) {
      searchTerm = event.target.value;
      const found = performSearch(cy, searchTerm, (n) => getDisplayText(n));
      resetStyle();
      highlightNodes(found);
      cy.resize();
      fitIntoView(found);
  }
</script>

<style>
  .cy {
      width: 100%;
      min-height: 800px;
      background-color: lightgrey;
  }

  .abs-input {
      position: absolute;
      z-index: 1;
      top: 1em;
      left: 1em;
  }
</style>

<div style="position:relative">
  <input class="abs-input" type="text" placeholder="Search nodes..." on:change={debounce(handleSearchChange, 300)}>
  <div class="cy" bind:this={targetEl}></div>
</div>
