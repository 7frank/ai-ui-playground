export const availableModels = [
  "gpt-3.5-turbo",
  "gpt-4-0613",
  "gpt-4-0125-preview",
];
export function getModelsConfig() {
  return {
    shell: {
      model: "gpt-3.5-turbo",
      // model: 'gpt-4-0613',
      // model: 'gpt-4-0125-preview',
    },
    sourcecode: {
      model: "gpt-3.5-turbo",
      // model: 'gpt-4-0613',
      // model: 'gpt-4-0125-preview',
    },
    testcode: {
      model: "gpt-3.5-turbo",
      // model: 'gpt-4-0613',
      // model: 'gpt-4-0125-preview',
    },
    testrunner: {
      model: "gpt-3.5-turbo",
      // model: 'gpt-4-0613',
      // model: 'gpt-4-0125-preview',
    },
  };
}
