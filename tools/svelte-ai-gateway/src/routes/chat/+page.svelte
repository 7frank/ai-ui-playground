<script lang="ts">
	import { onMount } from 'svelte';
	import OpenAI from 'openai';
	import { apiKey } from '../../stores/apiKeyStore';
	import type { DeepChat } from 'deep-chat';
	import type { ChatResponse } from '../api/chat/[proxyApiKey]/+server';

	let deepChat: DeepChat;

	let requestObject: DeepChat['request'];

	let responses: OpenAI.Chat.Completions.ChatCompletion.Choice[][] = [];

	onMount(async () => {
		await import('deep-chat');
		const proxyUrl = window.location.origin + '/api/chat/';
		requestObject = { url: proxyUrl + $apiKey };

		deepChat.responseInterceptor = (response: ChatResponse) => {
			

			const message = response.choices?.[0].message;
            const res={ text: message.content ?? undefined, role: message.role }
            console.log(res); 
			return res;
		};
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
			bind:this={deepChat}
            
			demo={false}
			request={requestObject}
			textInput={{ placeholder: { text: 'Welcome, welcome!!' } }}
			initialMessages={[{ role: 'assistant', html: '<b>Hey</b> ;-)' }]}
		/>
	{/if}
</main>

<style>
	/* Add your styling here */
</style>
