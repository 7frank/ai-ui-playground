interface TreeNode {
    id: string;
    children?: TreeNode[];
    processed?: boolean;
    parent?: TreeNode; // Optional reference to parent node for easier upward traversal
  }
  
  const processNode = (node: TreeNode) => {
    // Implement the processing logic for each node here
    console.log(`Processing node ${node.id}`);
    node.processed = true;
  };
  
  const markParents = (node: TreeNode) => {
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
        console.log(`Processing parent node ${current.id}`);
      }
      current = current.parent;
    }
  };
  
  const findLeafNodes = (node: TreeNode, leafNodes: TreeNode[] = []) => {
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
  
  const bottomUpTraversal = (root: TreeNode) => {
    const leafNodes = findLeafNodes(root);
    leafNodes.forEach(leafNode => {
      processNode(leafNode);
      markParents(leafNode);
    });
  };
  
  // Example of usage
  const tree: TreeNode = {
    id: '1',
    children: [
      {
        id: '2',
        children: [
          { id: '3' }, // Leaf
          { id: '4' }  // Leaf
        ]
      },
      {
        id: '5',
        children: [
          { id: '6' } // Leaf
        ]
      }
    ]
  };
  
  bottomUpTraversal(tree);
  