## What?

Goal Spin up fast clones of gradio repos /spaces on huggingface

> How do i know it is a gradio space?

It has `app.py` `requirements.txt`.

## Notes

https://github.com/cookiecutter/cookiecutter

## dev


### use cookiecutter to create a configuration
`sudo apt install pipx`

`bun run index.ts generate` to create the projects specified in `barn` into `.barn`


- for langflow run  `b bash-lf` then 
> langflow run --host 0.0.0.0 --port 7860

## Use Cases
- tts
### copilot 

#### Llama Coder
https://github.com/ex3ndr/llama-coder
https://huggingface.co/mrm8488/llama-2-coder-7b

#### tabbyml starcoder 7b

> https://huggingface.co/spaces/OzturkB/tabbyml-space/blob/main/Dockerfile

> docker run -it \
>   --gpus all -p 8080:8080 -v $HOME/.tabby:/data \
>   tabbyml/tabby \
>   serve --model TabbyML/StarCoder-1B --device cuda

## TODO

- get codellama up and running and connect service to langflow
- <del>create base image for gradio to reduce memory footprint for other images</del>
- diffusers-unofficial-sdxl-turbo-i2i-t2i will only run on gpu resources (fiddle with k8s deployment to find correct settings)

- langflow integration of models
- find out more about gradio container inner workings by checking the container build logs
    - https://huggingface.co/spaces/7Frank/deep-learning-for-coders-lesson-2?logs=build


## troubleshooting

### k8s deployed app not reachable

- try `k port-forward <k8s_pod_name> <localPort>:<k8s_containerPort>` to check if the app is runningin the pod at all


### suno-bark not running locally from dockerimage

https://github.com/suno-ai/bark/issues/215
some models will need tweaking 
- suno/bark need s more ram 16g?

      --cpu-period int                   Limit CPU CFS (Completely Fair Scheduler) period
      --cpu-quota int                    Limit CPU CFS (Completely Fair Scheduler) quota
      --cpu-rt-period int                Limit CPU real-time period in microseconds
      --cpu-rt-runtime int               Limit CPU real-time runtime in microseconds
  -c, --cpu-shares int                   CPU shares (relative weight)
      --cpus decimal                     Number of CPUs
      --cpuset-cpus string               CPUs in which to allow execution (0-3, 0,1)
      --cpuset-mems string               MEMs in which to allow execution (0-3, 0,1)

            --kernel-memory bytes              Kernel memory limit
  -m, --memory bytes                     Memory limit
      --memory-reservation bytes         Memory soft limit
      --memory-swap bytes                Swap limit equal to memory plus swap: '-1' to enable unlimited swap
      --memory-swappiness int            Tune container memory swappiness (0 to 100) (default -1)






