// we could have something like npm but for  deployable models

export const config = {
  // we would need some adapters for them k8s, docker-compose, docker (for local)
  deployments: {
    k8s: {
      namespace: "ajit-llm-test",
    },
  },
  registry: {
    // by default we would push the created images to the configured docker registry
    docker: { url: "gcr.io" },
  },
  // or something like this
  services: [
    {
      repo: "https://huggingface.co/spaces/elevenlabs/tts",
      type: "gradio", // or dockerhub, dockerfile, or any other template
      subdomain: "elevenlabs-tts-7frank",
      name: "elevenlabs-tts",
    },
    {
      repo: "https://github.com/7frank/foo/bar/Dockerfile",
      type: "dockerfile",
      subdomain: "foo-7frank",
      name: "foo",
    },
  ],
};
