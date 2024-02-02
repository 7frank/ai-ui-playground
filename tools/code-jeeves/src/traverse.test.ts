import { TaskSchema } from "./types/taskFileSchema";
import {
  taskSchemaToTreeNodeArray,
  TreeNode,
  bottomUpTraversal,
} from "./traverse";

//   // Example usage with generic data property
//   const tree: TreeNode<{ value: string }> = {
//     id: '1',
//     data: { value: 'Root' },
//     children: [
//       {
//         id: '2',
//         data: { value: 'Child 1' },
//         children: [
//           { id: '3', data: { value: 'Leaf 1' } }, // Leaf
//           { id: '4', data: { value: 'Leaf 2' } }  // Leaf
//         ]
//       },
//       {
//         id: '5',
//         data: { value: 'Child 2' },
//         children: [
//           { id: '6', data: { value: 'Leaf 3' } } // Leaf
//         ]
//       }
//     ]
//   };

//  bottomUpTraversal(tree);

// Example usage
const exampleTask: TaskSchema = {
  functionName: "MainFunction",
  task: "Main Task",
  declaration: "void Main()",
  ext: ".cs",
  preferences: "High",
  subTasks: [
    {
      functionName: "SubFunction1",
      task: "Sub Task 1",
      declaration: "void Sub1()",
      subTasks: [
        {
          functionName: "SubSubFunction1",
          task: "Sub Sub Task 1",
          declaration: "void SubSub1()",
        },
        {
          functionName: "SubSubFunction2",
          task: "Sub Sub Task 2",
          declaration: "void SubSub2()",
        },
      ],
    },
    {
      functionName: "SubFunction2",
      task: "Sub Task 2",
      declaration: "void Sub2()",
    },
  ],
};
const treeNode = taskSchemaToTreeNodeArray([exampleTask]);
// console.log(treeNode);
const res: string[] = [];
export const processNode = <T>(node: TreeNode<T>) => {
  // Implement the processing logic for each node here
  console.log(">>>", (node.data as any).functionName);
  res.push((node.data as any).functionName);

  return Promise.resolve("succeeded");
};

await bottomUpTraversal(treeNode, processNode);

console.log(res.join("--- \n"));
