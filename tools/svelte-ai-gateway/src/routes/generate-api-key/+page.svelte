<script lang="ts">
	import { onMount } from 'svelte';
	import { apiKey } from '../../stores/apiKeyStore';



	let mApiKey: string = '';
	let quota: number = 0;
	let message: string = '';

	async function generateKey(): Promise<void> {
		const response: Response = await fetch('/api/generate-api-key', {
			method: 'GET'
		});

		if (response.ok) {
			const data: { apiKey: string; quota: number; message: string } = await response.json();
			mApiKey = data.apiKey;
			quota = data.quota;
			message = data.message;

			apiKey.set(mApiKey);
		} else {
			message = 'Failed to generate API key. Please try again.';
		}
	}
</script>

<main>
	<h1>Generate API Key</h1>
	{#if message}
		<p>{message}</p>
	{/if}
	{#if mApiKey}
		<p>Your API Key: {mApiKey}</p>
		<p>Quota: {quota}</p>
	{/if}
	<button on:click={generateKey}>Generate API Key</button>
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
	}
	button {
		margin-top: 20px;
	}
</style>
