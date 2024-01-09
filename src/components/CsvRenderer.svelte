<script>
  import { onMount } from 'svelte';
  import Papa from 'papaparse';

  export let src; // 'src' is now an export variable, making it a prop

  let data = [];

  const loadData = async () => {
    if (!src) return; // Do not load if src is not defined
    const response = await fetch(src);
    const text = await response.text();
    Papa.parse(text, {
      header: true,
      complete: (results) => {
        data = results.data;
      }
    });
  };

  // Initial load
  onMount(loadData);

  // Reactive statement to reload data when 'src' changes
  $: src, loadData();
</script>

<main>
  {#if data.length > 0}
    <table>
      <thead>
        <tr>
          {#each Object.keys(data[0]) as key}
            <th>{key}</th>
          {/each}
        </tr>
      </thead>
      <tbody>
        {#each data as row}
          <tr>
            {#each Object.values(row) as value}
              <td>{value}</td>
            {/each}
          </tr>
        {/each}
      </tbody>
    </table>
  {:else}
    <p>Loading... {src}</p>
  {/if}
</main>

<style>
  /* Add your styling here */
</style>
