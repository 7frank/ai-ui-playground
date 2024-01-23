<script>
    import ElementWrapper from './ElementWrapper.svelte';
    import ModalDialog from './ModalDialog.svelte';
    import { writable } from 'svelte/store';
    import Portal from "svelte-portal";
    
    export let maxStyle = '';
    const showModal = writable(false);
  
    function toggleModal() {
      showModal.update(n => !n);
    }
</script>

<ElementWrapper>
    <div slot="toolbar">
        <button on:click={toggleModal}>Maximize</button>
    </div>
    <slot></slot>
</ElementWrapper>

<Portal target="body">
    <ModalDialog bind:visible={$showModal} {maxStyle}>
        <slot></slot>
    </ModalDialog>
</Portal>

  