<script lang="ts">
    // No script needed for this basic layout, but you can include page logic here if necessary
</script>

<nav>
    <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/generate-api-key">Generate API Key</a></li>
        
        <li><a href="/set-api-key">Set API Key</a></li>
        <li><a href="/chat">Chat</a></li>
        <!-- Add more navigation links as needed -->
    </ul>
</nav>

<main>
    <!-- This slot will be replaced by the content of the page using this layout -->
    <slot></slot>
</main>

<style>
    nav {
        background-color: #f0f0f0;
        padding: 1rem;
    }
    ul {
        list-style: none;
        padding: 0;
        margin: 0;
        display: flex;
        gap: 1rem;
    }
    li {
        margin: 0;
    }
    a {
        text-decoration: none;
        color: #333;
    }
    main {
        padding: 1rem;
    }
</style>
