<script lang="ts">
    import { onMount } from 'svelte';
    import OpenAI from "openai";
    import { apiKey } from '../../stores/apiKeyStore';

    let message = '';
    let responses: OpenAI.Chat.Completions.ChatCompletion.Choice[][] = [];
   
    async function sendMessage(apiKey:string) {


      if (!apiKey) {
        console.error('API Key is required');
        return;
      }
      const response = await fetch(`/api/chat/${apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      });
  
      if (response.ok) {
        // FIXME check what proper api typing ways there are 
        // e.g. https://svelte.dev/blog/zero-config-type-safety
        const data = await response.json() as {apiKey:string,choices:OpenAI.Chat.Completions.ChatCompletion.Choice[]};
        // FIXME we can do better check out the runes api in svelte 5
        responses=[...responses,data.choices]
        message = ''; // Reset message input
      } else {
        console.error('Failed to send message');
      }
    }
  </script>
  
  <main>
    <h1>Chat with AI</h1>
    <!-- Assuming there's a way to set the apiKey, like a settings page or input field -->
    <div>
      <input type="text" bind:value={message} placeholder="Say something..." />
      <button on:click={()=>sendMessage($apiKey)}>Send</button>
    </div>
    <ul>
      {#each responses as response (response)}
        <div>
            {#each response as choice (choice)}
             <li>{choice.message.content}</li>)}
            {/each}
        </div>
      {/each}
    </ul>
  </main>
  
  
  <style>
    /* Add your styling here */
  </style>
  