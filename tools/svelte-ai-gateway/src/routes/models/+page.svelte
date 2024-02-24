<script lang="ts">

/** @type {import('./$types').PageData} */
export let data;
</script>

<main>
	<h1>OpenAI Models Overview</h1>
	<h3>These are the model names that we support and which you can set, when querying this proxy server</h3>
	<ul>
		{#each data.models as {modelName,baseUrl}}
			<li>
				<strong>{modelName}</strong>
				<ul>
					<li>baseUrl: {baseUrl}</li>
				</ul>
			</li>
		{/each}
	</ul>
</main>

<style>
	/* Add any styling you need here */
	main {
		font-family: Arial, sans-serif;
		padding: 20px;
	}
	ul {
		list-style-type: none;
	}
	li {
		margin-bottom: 10px;
	}
	strong {
		color: #333;
	}
</style>
