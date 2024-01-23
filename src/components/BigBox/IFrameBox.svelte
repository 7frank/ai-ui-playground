<script>
    import BigBox from './BigBox.svelte';

    export let src = "";
    export let maxStyle =""
    export let style = ""

</script>

<BigBox 
    maxStyle={"width: 95%; height: 95%;"+maxStyle } 
    {src}
>
    {#if src}
        <iframe src={src} title="" style={"min-height:400px;width:100%;height:100%;"+style }  />
    {:else}
        <p>Please provide a source URL.</p>
    {/if}
</BigBox>
