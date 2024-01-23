<script>
    import ElementWrapper from './ElementWrapper.svelte';
    import ModalDialog from './ModalDialog.svelte';
    import { writable } from 'svelte/store';
  
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

<ModalDialog bind:visible={$showModal}>
<slot></slot>
</ModalDialog>
  