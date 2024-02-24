<script lang="ts">
	import { onMount } from 'svelte';
	import OpenAI from 'openai';
	import { apiKey } from '../../stores/apiKeyStore';
	import type { DeepChat } from 'deep-chat';

	let requestObject: DeepChat['request'];

	let responses: OpenAI.Chat.Completions.ChatCompletion.Choice[][] = [];

	onMount(async () => {
		await import('deep-chat');
		const proxyUrl = window.location.origin + '/api/chat/';
		requestObject = { url: proxyUrl + $apiKey };
	});
</script>

<main>
	<h1>Chat with AI</h1>

    {#if !$apiKey}
    <b>Generate API key first</b>
    {/if}
	{#if requestObject}
		<!-- demo/textInput are examples of passing an object directly into a property -->
		<!-- initialMessages is an example of passing an object from script into a property -->
		<deep-chat
			demo={false}
			request={requestObject}
			textInput={{ placeholder: { text: 'Welcome, welcome!!' } }}
			initialMessages={responses
				.map((it) => it[0])
				.filter((it) => !!it)
				.map((it) => it.message)}
		/>
	{/if}
</main>

<style>
	/* Add your styling here */
</style>
