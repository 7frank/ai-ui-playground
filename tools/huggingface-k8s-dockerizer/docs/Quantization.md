## alternatives to vllm & localai

https://github.com/janhq/awesome-local-ai

## Quantization (signal processing)

We might be able to use mixtral8x7b with quantization

out of the box the model seems to provide 4bit

- https://huggingface.co/mistralai/Mixtral-8x7B-Instruct-v0.1

- https://huggingface.co/collections/mobiuslabsgmbh/mixtral-hqq-quantized-models-65776b2edddc2360b0edd451
- https://huggingface.co/mobiuslabsgmbh/Mixtral-8x7B-Instruct-v0.1-hf-2bit_g16_s128-HQQ
- https://github.com/ggerganov/llama.cpp/discussions/4800
- https://medium.com/@ingridwickstevens/quantizing-mixtral-exploring-performance-and-challenges-across-diverse-prompts-671f0c49ddc7
- https://github.com/vllm-project/vllm/issues/392
- https://www.localai.app/

## testing

- https://www.reddit.com/r/LocalLLaMA/comments/18gwn4y/noob_question_how_are_people_able_to_run_mistral/
- there is a comment claiming they got it running with 2bit and CPU only
- also providing a colab notebook

  - https://colab.research.google.com/gist/chigkim/5521120118fd7533a224b36a3167972f/mixtral.ipynb#scrollTo=q9IV1xQao-We

- list of quaitizations and memory requirements

  - https://huggingface.co/TheBloke/Mixtral-8x7B-Instruct-v0.1-GGUF

- server docs
  - https://github.com/ggerganov/llama.cpp/blob/master/examples/server/README.md

### ollama

- https://ollama.com/jmorgan/mixtral:8x7b-instruct-v0.1-q2_K
- `curl -fsSL https://ollama.com/install.sh | sh`
- docker https://hub.docker.com/r/ollama/ollama
- ollama run llama2
- ollama run jmorgan/mixtral:8x7b-instruct-v0.1-q2_K

[Ollama API Docs](https://github.com/ollama/ollama/blob/main/docs/api.md#generate-a-chat-completion)

[openai-compatibility](https://ollama.com/blog/openai-compatibility)

- http://localhost:11434/

#### llama2
curl http://localhost:11434/api/chat -d '{
  "model": "llama2",
  "messages": [
    {
      "role": "user",
      "content": "why is the sky blue?"
    }
  ]
}'

#### mixtral8x7b

curl http://localhost:11434/api/chat -d '{
  "model": "jmorgan/mixtral:8x7b-instruct-v0.1-q2_K",
  "messages": [
    {
      "role": "user",
      "content": "why is the sky blue?"
    }
  ]
}'

#### openai compatible api (für chat)
curl http://localhost:11434/v1/chat/completions \
    -H "Content-Type: application/json" \
    -d '{
        "model": "llama2",
        "messages": [
            {
                "role": "system",
                "content": "You are a helpful assistant."
            },
            {
                "role": "user",
                "content": "Hello!"
            }
        ]
    }'

#### troubleshooting

GPU MIG 

- https://medium.com/@CQCZhang/building-a-robust-gpu-cloud-in-60-mins-part-2-nvidia-a100-and-mig-on-kubernetes-e004723cd2a9

- https://github.com/ollama/ollama/issues/1500
- https://github.com/ollama/ollama/pull/2264
- https://github.com/ollama/ollama/pull/2264/files

