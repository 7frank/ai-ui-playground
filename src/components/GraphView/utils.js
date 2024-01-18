export 
const performSearch = (cy,term,nodeToStr) => {
    if (!cy) return;


   if (term.trim() === '') return;
   
   return cy.nodes().filter(node => {
      const label = nodeToStr(node); // Adjust based on your data attribute
      console.log(label,label.toLowerCase().includes(term.toLowerCase()))
      return label.toLowerCase().includes(term.toLowerCase());
    })
  }
  
  export 
  function debounce(func, wait) {
    let timeout;
  
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
  
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }