<script lang="ts">
    import { apiKey } from '../../stores/apiKeyStore';
 
    let keyInput: string = '';

    function saveApiKey() {
        apiKey.set(keyInput);
    }
</script>

<main>

    <h2>Using the API Key</h2>
    <p>The current API key is: {$apiKey}</p>

    <h1>Set API Key</h1>
    <input type="text" bind:value={keyInput} placeholder="Enter your API key" />
    <button on:click={saveApiKey}>Save API Key</button>
</main>

<style>
    main {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1rem;
        padding: 1rem;
    }
    input {
        width: 100%;
        max-width: 400px;
        padding: 0.5rem;
    }
    button {
        padding: 0.5rem 1rem;
    }
</style>
