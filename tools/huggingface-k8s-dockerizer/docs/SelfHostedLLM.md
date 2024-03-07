### deploy your own LLMs

> Note: not tested but localai provides other models too.


#### ollama

install multiple models with oolama & docker on k8s and see if quantizised mixtra 8x7b rpoves good enough results

#### localai

##### overview

- see list of models for cpu only
  - https://localai.io/basics/getting_started/index.html
  - `mixtral-instruct Mixtral-8x7B-Instruct-v0.1`
  - `bark`
  - ...
  - for the models
    - https://github.com/mudler/LocalAI/blob/master/embedded/model_library.yaml
    - https://github.com/mudler/LocalAI/tree/master/embedded/models

[ mixtral-instruct Mixtral-8x7B-Instruct-v0.1](https://itnext.io/k8sgpt-localai-unlock-kubernetes-superpowers-for-free-584790de9b65)

##### run locally

```
docker run -ti -p 8080:8080 localai/localai:v2.9.0-ffmpeg-core phi-2
```

```
curl -X POST "http://localhost:8080/v1/chat/completions" \
     -H "Content-Type: application/json" \
     -d '{"model": "phi-2", "prompt": "Say this is a test", "temperature": 0, "max_tokens": 200}'
```

##### run on k8s

`k apply -f base/localai.phi-2.yaml `

Note: Fiddle a bit with the cpu resources to find a decent performance.

> k apply -f base/localai.phi-2.yaml
> k get pods
> python ./langflow/ex/askPhi2OnK8s.py

`python langflow/ex/askPhi2OnK8s.py`

**OR**

```
curl -X POST "https://phi-2-llm-frank1147.internal.jambit.io/v1/chat/completions" \
 -H "Content-Type: application/json" \
 -d '{"model": "phi-2", "prompt": "Say this is a test", "temperature": 0, "max_tokens": 200}'

```

#### vllm

##### run locally

> vLLM requires a gpu, we need something that supports cpu as well for slower but more versatile model provisioning.

https://github.com/substratusai/vllm-docker/blob/main/README.md

```
docker run -d -p 8080:8080 --gpus=all \
  -e MODEL=mistralai/Mistral-7B-Instruct-v0.1 \
  ghcr.io/substratusai/vllm

docker run -d -p 8080:8080 \
  -e MODEL=mistralai/Mistral-7B-Instruct-v0.1 \
  ghcr.io/substratusai/vllm

docker run -v "$(pwd):/foo" -p 8080:8080 -e MODEL=mistralai/Mistral-7B-Instruct-v0.1 --entrypoint=/bin/bash -it  ghcr.io/substratusai/vllm

```

##### run on k8s with gpu

```
# deploy stuff
k apply -f base/vllm-gpu.yaml

# log pod
k logs $(k get pods -l app=application  -o jsonpath='{.items[0].metadata.name}') --tail=100 -f

# or use k9s cli

```

- https://docs.vllm.ai/en/latest/getting_started/quickstart.html
- http://ajit-llm-test.internal.jambit.io/docs
```

# get models
curl https://ajit-llm-test.internal.jambit.io/v1/models

# chat example
curl https://ajit-llm-test.internal.jambit.io/v1/completions \
-H "Content-Type: application/json" \
-d '{
"model": "mistralai/Mistral-7B-Instruct-v0.1",
"prompt": "San Francisco is a",
"max_tokens": 7,
"temperature": 0
}'

```

#### troubleshooting


##### try to run mistralai/Mixtral-8x7B-Instruct-v0.1 on k8s

- when altering supervisor.config
  - `supervisorctl reread`
  - `supervisorctl update`

- supervisor.conf changes
- `nano /etc/supervisor/supervisord.conf`
  ```
  [program:myapp]
  command=entrypoint.sh
  environment=MODEL="mistralai/Mixtral-8x7B-Instruct-v0.1"
  autostart=true
  autorestart=false
  ```


- restart service 
  - `ps -e | grep python | awk '{print $1}' | xargs kill -9`
  - `supervisorctl restart myapp`

- get an explanation
  - `python3 -m vllm.entrypoints.openai.api_server -h | grep model`
  - `--served-model-name` name to be used by API requests

- the underlying command
  ```
  python3 -m vllm.entrypoints.openai.api_server --worker-use-ray --host 0.0.0.0 --port 8080 --model mistralai/Mistral-7B-Instruct-v0.1 --served-model-name mistralai/Mistral-7B-Instruct-v0.1 --tensor-parallel-size 1
  ```
- the output when the above command is running properly
  ```txt
  INFO 03-07 13:13:53 api_server.py:228] args: Namespace(host='0.0.0.0', port=8080, allow_credentials=False, allowed_origins=['*'], allowed_methods=['*'], allowed_headers=['*'], api_key=None, served_model_name='mistralai/Mistral-7B-Instruct-v0.1', lora_modules=None, chat_template=None, response_role='assistant', ssl_keyfile=None, ssl_certfile=None, root_path=None, middleware=[], model='mistralai/Mistral-7B-Instruct-v0.1', tokenizer=None, revision=None, code_revision=None, tokenizer_revision=None, tokenizer_mode='auto', trust_remote_code=False, download_dir=None, load_format='auto', dtype='auto', kv_cache_dtype='auto', max_model_len=None, worker_use_ray=True, pipeline_parallel_size=1, tensor_parallel_size=1, max_parallel_loading_workers=None, block_size=16, seed=0, swap_space=4, gpu_memory_utilization=0.9, max_num_batched_tokens=None, max_num_seqs=256, max_paddings=256, disable_log_stats=False, quantization=None, enforce_eager=False, max_context_len_to_capture=8192, disable_custom_all_reduce=False, enable_lora=False, max_loras=1, max_lora_rank=16, lora_extra_vocab_size=256, lora_dtype='auto', max_cpu_loras=None, device='auto', engine_use_ray=False, disable_log_requests=False, max_log_len=None)
  2024-03-07 13:13:55,187	INFO worker.py:1724 -- Started a local Ray instance.
  INFO 03-07 13:13:56 llm_engine.py:87] Initializing an LLM engine with config: model='mistralai/Mistral-7B-Instruct-v0.1', tokenizer='mistralai/Mistral-7B-Instruct-v0.1', tokenizer_mode=auto, revision=None, tokenizer_revision=None, trust_remote_code=False, dtype=torch.bfloat16, max_seq_len=32768, download_dir=None, load_format=auto, tensor_parallel_size=1, disable_custom_all_reduce=False, quantization=None, enforce_eager=False, kv_cache_dtype=auto, device_config=cuda, seed=0)
  INFO 03-07 13:14:00 weight_utils.py:163] Using model weights format ['*.safetensors']
  INFO 03-07 13:14:06 llm_engine.py:357] # GPU blocks: 9010, # CPU blocks: 2048
  INFO 03-07 13:14:07 model_runner.py:684] Capturing the model for CUDA graphs. This may lead to unexpected consequences if the model is not static. To run the model in eager mode, set 'enforce_eager=True' or use '--enforce-eager' in the CLI.
  INFO 03-07 13:14:07 model_runner.py:688] CUDA graphs can take additional 1~3 GiB memory per GPU. If you are running out of memory, consider decreasing `gpu_memory_utilization` or enforcing eager mode. You can also reduce the `max_num_seqs` as needed to decrease memory usage.
  INFO 03-07 13:14:11 model_runner.py:756] Graph capturing finished in 4 secs.
  INFO 03-07 13:14:11 serving_chat.py:302] Using default chat template:
  INFO 03-07 13:14:11 serving_chat.py:302] {{ bos_token }}{% for message in messages %}{% if (message['role'] == 'user') != (loop.index0 % 2 == 0) %}{{ raise_exception('Conversation roles must alternate user/assistant/user/assistant/...') }}{% endif %}{% if message['role'] == 'user' %}{{ '[INST] ' + message['content'] + ' [/INST]' }}{% elif message['role'] == 'assistant' %}{{ message['content'] + eos_token + ' ' }}{% else %}{{ raise_exception('Only user and assistant roles are supported!') }}{% endif %}{% endfor %}
  INFO:     Started server process [74054]
  INFO:     Waiting for application startup.
  INFO:     Application startup complete.
  INFO:     Uvicorn running on http://0.0.0.0:8080 (Press CTRL+C to quit)
  INFO:     10.241.36.112:48720 - "GET /docs HTTP/1.1" 200 OK
  ```

- command to run mixtral8x7b
  ```
  python3 -m vllm.entrypoints.openai.api_server --worker-use-ray --host 0.0.0.0 --port 8080 --model mistralai/Mixtral-8x7B-Instruct-v0.1 --served-model-name mistralai/mistralai/Mixtral-8x7B-Instruct-v0.1 --tensor-parallel-size 1
  ```
- the error message from above
  ```txt
  RuntimeError: NVML_SUCCESS == r INTERNAL ASSERT FAILED at "../c10/cuda/CUDACachingAllocator.cpp":1154, please report a bug to PyTorch. 
  ```

`watch nvidia-smi`

result for mistral-7b
```
+---------------------------------------------------------------------------------------+
| MIG devices:                                                                          |
+------------------+--------------------------------+-----------+-----------------------+
| GPU  GI  CI  MIG |                   Memory-Usage |        Vol|      Shared           |
|      ID  ID  Dev |                     BAR1-Usage | SM     Unc| CE ENC DEC OFA JPG    |
|                  |                                |        ECC|                       |
|==================+================================+===========+=======================|
|  0    1   0   0  |           33134MiB / 40192MiB  | 42      0 |  3   0    2    0    0 |
|                  |               2MiB / 65535MiB  |           |                       |
+------------------+--------------------------------+-----------+-----------------------+

```


> it seems to be an OOM problem

https://neon.tech/blog/mixtral-8x7b-what-you-need-to-know-about-mistral-ais-latest-model

> If you plan to fine-tune Mixtral and your own inference, it’s important to note that Mixtral requires much more RAM and GPUs than Mistral 7B. While Mistral 7B works well on a 24GB RAM 1 GPU instance, Mixtral requires 64GB of RAM and 2 GPUs, which increases the cost by a factor of 3 (1.3$/h vs. 4.5$/h).

- options?
  - https://github.com/eugeneyan/open-llms
  - https://huggingface.co/spaces/HuggingFaceH4/open_llm_leaderboard