<script>
    import Grid from "gridjs-svelte"
    import { onMount } from 'svelte';
    import Papa from 'papaparse';

    export let src; // 'src' is now an export variable, making it a prop

    $: data = [];
    $: columns = [];

    const loadData = async () => {
      if (!src) return; // Do not load if src is not defined
      const response = await fetch(src);
      const text = await response.text();
      Papa.parse(text, {
        header: true,
        complete: (results) => {
          data = results.data;
          columns= data?.[0]?Object.keys(data[0]).map(i=> ({id:i,name:i})):[]
        }
      });
    };

  // Initial load
  onMount(loadData);

  // Reactive statement to reload data when 'src' changes
  $: src, loadData();

  </script>
  

  {#if data.length > 0}
    <Grid data={data} columns={columns} sort={true} pagination=true f />

  {:else}
    <p>Loading... {src}</p>
  {/if}

  
  <style global>
    @import "https://cdn.jsdelivr.net/npm/gridjs/dist/theme/mermaid.min.css";
  </style>