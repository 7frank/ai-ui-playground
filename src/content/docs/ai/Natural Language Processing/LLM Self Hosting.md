---
title: LLM - Self Hosting
---


## Self Hosting

### options

- Ollama
  - currently best option

- localAI (more production ready)

- H2OGPT (lots of features & potential)
  - https://github.com/h2oai/h2ogpt
    - Clone the repo `docker compose -f docker-compose-cpu.yml up` and grab a coffee
    - it will be available at http://localhost:7860/ after about 10-20 minutes when run first time
    - Provides STT, RAG with your own Documents, many more
  - https://gpt.h2o.ai/

- vLLM
- GPT4all


### Why
- customers and developers sometimes can't share data with openai and other services
- see [CodeJeeves](../Potential%20Use%20Cases/CodeJeeves.mdx) ideas section for more
### Use cases


- Self Hosted LLM as a Service
- "White Label"
- internal API that serves as a project kickstarter by making retrieving access to LLMs as easy as possbile
  - no data exposed
  - no setup of LLM per developer

### building blocks
- [openai api quota proxy](https://github.com/AI-Northstar-Tech/openai-proxy
- [Local.AI](https://localai.io/)
- Docker
- onPrem or Cloud GPU
- (K8s for scaling and distributing GPU)




### considerations

#### LocalAI image size

The large size of the LocalAI Docker image, which is about 50GB, is mainly due to the inclusion of CUDA for GPU support and numerous Python dependencies for various backends. Users have reported significant sizes for these images, with one version being 36.9GB compressed on quay.io, which can be problematic for operations like GitHub Actions due to space limitations.

> run `baobab` to find directories with large files that you can delete

LocalAI has addressed these concerns by introducing `-core` images that exclude the extra Python dependencies, significantly reducing the size of the Docker images. These core versions are aimed at users who do not need the Python-based backends, offering a lighter alternative for deployment.

For users who require the functionalities provided by the Python dependencies but are concerned about the Docker image size, it's possible to manually add Python-based backends to the `-core` images. This process involves executing `make` commands to prepare the dependencies for the desired backend as detailed in the Dockerfile, though it requires a more manual and involved approach.

This development reflects an effort to balance functionality with resource constraints, leading to more optimized Docker images that cater to various deployment needs.

- **Source 1**: [GitHub Issue on LocalAI image size](https://github.com/mudler/LocalAI/issues/1403)
- **Source 2**: [GitHub Discussion on splitting core and extra images](https://github.com/mudler/LocalAI/issues/1162)

- for a list of docker images check out https://localai.io/basics/getting_started/
- or here https://hub.docker.com/r/localai/localai/tags?name=core
- these images are way lighter (still huge) anddepending on the purpose will be easier to handle


#### (1) data privacy with own GPU resources 

- setup own models 

#### convenience tunneling openai where data privacy is not top priority

- tunnel openai for these use cases