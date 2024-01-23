<script>
    // You can add script logic here if needed
  </script>
  
  <style>
    .wrapper {
      position: relative;
      /* Add more styles as per your requirements */
    }
  
    .toolbar {
      display: none;
      position: absolute;
      right: 0;
      /* Add more styles for your toolbar */
    }
  
    .wrapper:hover .toolbar {
      display: block;
    }
  </style>
  
  <div class="wrapper">
    <div class="toolbar">
      <slot name="toolbar"></slot>
    </div>
    <div class="content">
      <slot></slot>
    </div>
  </div>
  