<script>
    export let visible = false;
    export let maxStyle = ''; 
    export let close;
  
    function handleClose() {
      if (typeof close === 'function') {
        close();
      }
      visible=false;
    }
  </script>
  {#if visible}
  <div class="modal-backdrop" on:click={handleClose}>
    <div class="modal-content" style={maxStyle} on:click|stopPropagation>
      <slot></slot>
    </div>
  </div>
  {/if}

  
  <style>
    .modal-backdrop {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 5;
    }
  
    .modal-content {
      background-color: white;
      padding: 20px;
      border-radius: 5px;
      /* Add more styling as needed */
    }
  </style>
  