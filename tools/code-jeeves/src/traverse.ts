import { processNode } from "./traverse.test";
import { TaskSchema } from "./types/taskFileSchema";

export interface TreeNode<T = any> {
  // Added a generic type parameter T with a default of any
  id: string;
  children?: TreeNode<T>[];
  processed?: boolean; // TODO make processes == type state ="succeeded"|"skipped"|"failed" | false
  parent?: TreeNode<T>; // Ensure the parent is of the same generic type
  data?: T; // Generic data property to hold arbitrary payloads
}

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
    if (allChildrenProcessed && !current.processed) {
      processNode(current); // Process the parent node if all its children are processed and it's not already processed
      current = current.parent; // Move up to the next parent
    } else {
      break; // Stop moving up if we find an unprocessed node or all nodes are processed
    }
  }
};

const findLeafNodes = <T>(node: TreeNode<T>, leafNodes: TreeNode<T>[] = []) => {
  if (!node.children || node.children.length === 0) {
    leafNodes.push(node);
  } else {
    node.children.forEach((child) => {
      findLeafNodes(child, leafNodes);
    });
  }
  return leafNodes;
};

export const bottomUpTraversal = async <T, Res = any>(
  roots: TreeNode<T>[],
  processNode: (node: TreeNode<T>) => Promise<Res>,
) => {
  let leafNodes: TreeNode<T>[] = [];
  roots.forEach((root) => {
    findLeafNodes(root, leafNodes); // Find all leaf nodes for each root node
  });

  leafNodes.forEach(async (leafNode) => {
    await processNode(leafNode); // Process each leaf node
    leafNode.processed = true;
    markParents(leafNode); // Then mark its parents for processing
  });
};


export const taskSchemaToTreeNodeArray = (
  tasks: TaskSchema[],
  parentId: string = "",
  depth: number = 0,
): TreeNode<TaskSchema>[] => {
  return tasks.map((task, index) => {
    const nodeId = parentId ? `${parentId}-${depth}-${index}` : `root-${index}`; // Generate a unique ID for each node
    const node: TreeNode<TaskSchema> = {
      id: nodeId,
      data: { ...task, subTasks: undefined }, // Exclude subTasks from data to avoid redundancy
      children: [],
    };

    if (task.subTasks && task.subTasks.length > 0) {
      node.children = taskSchemaToTreeNodeArray(task.subTasks, nodeId, index);
      node.children.forEach((child) => (child.parent = node)); // Set parent for each child node
    }

    return node;
  });
};


