<script lang="ts">
	import { onMount } from 'svelte';
	import OpenAI from 'openai';
	import { apiKey } from '../../stores/apiKeyStore';
	import type { DeepChat } from 'deep-chat';
	import type { ChatResponse } from '../api/chat/[proxyApiKey]/+server';

	let deepChat: DeepChat | undefined;

	let requestObject: DeepChat['request'];

	$: if (deepChat) {
		deepChat.responseInterceptor = (response: ChatResponse) => {
			const message = response.choices?.[0].message;
			const res = { text: message.content ?? undefined, role: message.role };
			console.log(res);
			return res;
		};
	}

	onMount(async () => {
		await import('deep-chat');
		const proxyUrl = window.location.origin + '/api/chat/';
		requestObject = { url: proxyUrl + $apiKey };
	});
</script>

<main>
	<h1>Chat with AI</h1>


	{#if requestObject}
		<!-- demo/textInput are examples of passing an object directly into a property -->
		<!-- initialMessages is an example of passing an object from script into a property -->
		<deep-chat
            id="the-chat"
			bind:this={deepChat}
			demo={false}
            
			request={requestObject}
			textInput={{ placeholder: { text: 'Welcome, welcome!!' } }}
			initialMessages={[{ role: 'assistant', html: '<b>Hey</b> ;-)'+ (!$apiKey?"<b> You need to generate a proxy API key before we can chat!</b>":" Let's go!") }]}
			style="border-radius: 10px"
			messageStyles={{
				default: {
					shared: {
						bubble: {
							maxWidth: '100%',
							backgroundColor: 'unset',
							marginTop: '10px',
							marginBottom: '10px'
						}
					},
					user: {
						bubble: {
							marginLeft: '0px',
							color: 'black'
						}
					},
					ai: {
						outerContainer: {
							backgroundColor: 'rgba(247,247,248)',
							borderTop: '1px solid rgba(0,0,0,.1)',
							borderBottom: '1px solid rgba(0,0,0,.1)'
						}
					}
				}
			}}
			avatars={{
				default: { styles: { position: 'left' } },
				ai: { src: 'https://deepchat.dev/img/openAIGreyLogo.svg' }
			}}
			submitButtonStyles={{
				submit: {
					container: {
						default: { backgroundColor: '#19c37d' },
						hover: { backgroundColor: '#0bab69' },
						click: { backgroundColor: '#068e56' }
					},
					svg: {
						content:
							'<?xml version="1.0" ?> <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"> <g> <path d="M21.66,12a2,2,0,0,1-1.14,1.81L5.87,20.75A2.08,2.08,0,0,1,5,21a2,2,0,0,1-1.82-2.82L5.46,13H11a1,1,0,0,0,0-2H5.46L3.18,5.87A2,2,0,0,1,5.86,3.25h0l14.65,6.94A2,2,0,0,1,21.66,12Z"> </path> </g> </svg>',
						styles: {
							default: {
								width: '1.3em',
								marginTop: '0.15em',
								filter:
									'brightness(0) saturate(100%) invert(100%) sepia(28%) saturate(2%) hue-rotate(69deg) brightness(107%) contrast(100%)'
							}
						}
					}
				},
				loading: {
					container: { default: { backgroundColor: 'white' } },
					svg: {
						styles: {
							default: {
								filter:
									'brightness(0) saturate(100%) invert(72%) sepia(0%) saturate(3044%) hue-rotate(322deg) brightness(100%) contrast(96%)'
							}
						}
					}
				},
				stop: {
					container: {
						default: { backgroundColor: 'white' },
						hover: { backgroundColor: '#dadada52' }
					},
					svg: {
						content:
							'<?xml version="1.0" encoding="utf-8"?> <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"> <rect width="24" height="24" rx="4" ry="4" /> </svg>',
						styles: {
							default: {
								width: '0.95em',
								marginTop: '0.32em',
								filter:
									'brightness(0) saturate(100%) invert(72%) sepia(0%) saturate(3044%) hue-rotate(322deg) brightness(100%) contrast(96%)'
							}
						}
					}
				}
			}}
		/>
	{/if}
</main>

<style>
	#the-chat{
        width:calc(100vw - 5em) !important;
    }
</style>
