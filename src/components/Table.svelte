<script>
    import Grid from "gridjs-svelte"
    import { onMount } from 'svelte';
    import Papa from 'papaparse';

    export let src; // 'src' is now an export variable, making it a prop

    $: data = [];
    $: filteredData = [];
    $: columns = [];
    $: filterValue=null


    // Filter the data based on the filter value
    $: if (filterValue){
      filteredData=data.map(row => {
        let hasCell=false
        Object.keys(row).forEach(function(key) {
          if (row[key].toLowerCase().indexOf(filterValue.toLowerCase())>-1)
          hasCell=true

      });
      if (hasCell) return row
  
      }).filter(i=> !!i)
     } else filteredData=data



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
  
  <div>
    <input style="float: right;margin:0.5em;padding:0.5em;border-radius:3px;"  placeholder="filter table" bind:value={filterValue} />
  </div>

  {#if data.length > 0}
    <Grid data={filteredData} columns={columns} sort={true} pagination=true />
  {:else}
    <p>Loading... {src}</p>
  {/if}

  
  <style global>
    @import "https://cdn.jsdelivr.net/npm/gridjs/dist/theme/mermaid.min.css";
  </style>