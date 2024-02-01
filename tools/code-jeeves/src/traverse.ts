interface TreeNode<T = any> { // Added a generic type parameter T with a default of any
    id: string;
    children?: TreeNode<T>[];
    processed?: boolean;
    parent?: TreeNode<T>; // Ensure the parent is of the same generic type
    data?: T; // Generic data property to hold arbitrary payloads
  }
  
  const processNode = <T>(node: TreeNode<T>) => {
    // Implement the processing logic for each node here
    console.log(`Processing node ${node.id} with data:`, node.data);
    node.processed = true;
  };
  
  const markParents = <T>(node: TreeNode<T>) => {
    let current = node.parent;
    while (current) {
      let allChildrenProcessed = true;
      for (let child of current.children || []) {
        if (!child.processed) {
          allChildrenProcessed = false;
          break;
        }
      }
      if (allChildrenProcessed) {
        current.processed = true; // Mark the parent as processed if all its children are processed
        console.log(`Processing parent node ${current.id} with data:`, current.data);
      }
      current = current.parent;
    }
  };
  
  const findLeafNodes = <T>(node: TreeNode<T>, leafNodes: TreeNode<T>[] = []) => {
    if (!node.children || node.children.length === 0) {
      leafNodes.push(node);
    } else {
      node.children.forEach(child => {
        child.parent = node; // Set parent reference for each child
        findLeafNodes(child, leafNodes);
      });
    }
    return leafNodes;
  };
  
  const bottomUpTraversal = <T>(root: TreeNode<T>) => {
    const leafNodes = findLeafNodes(root);
    leafNodes.forEach(leafNode => {
      processNode(leafNode);
      markParents(leafNode);
    });
  };
  
  // Example usage with generic data property
  const tree: TreeNode<{ value: string }> = {
    id: '1',
    data: { value: 'Root' },
    children: [
      {
        id: '2',
        data: { value: 'Child 1' },
        children: [
          { id: '3', data: { value: 'Leaf 1' } }, // Leaf
          { id: '4', data: { value: 'Leaf 2' } }  // Leaf
        ]
      },
      {
        id: '5',
        data: { value: 'Child 2' },
        children: [
          { id: '6', data: { value: 'Leaf 3' } } // Leaf
        ]
      }
    ]
  };
  
  bottomUpTraversal(tree);
  