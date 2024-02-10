---
title: Experiments
---

This section summarizes some small scenarios testing capabilites

## [done] stabilityai-sdxl
- on huggingface (Problem: GPU is not free) and modelrrequires GPU
    - https://huggingface.co/spaces/7Frank/stabilityai-sdxl

- Free GPU but installation takes ages per kernel (model worked quickly for a bit then kernel died)
    - https://www.kaggle.com/code/s7frank/notebookf4e4cb6260

Outcome: works fast, but requires GPU


## [WIP] infering user skills via collaborative filtering 


> https://chat.openai.com/c/2d01823d-15f3-41f1-a460-6d365b8f2727


Based on [Fast AI - Course: Lesson 7](https://course.fast.ai/Lessons/lesson7.html) collaborative filtering where they discuss how to get movie recoomendations and the  [collaborative filtering - jupiter notebook](https://www.kaggle.com/code/jhoward/collaborative-filtering-deep-dive/notebook) they have we want to try out recommending user skills.

> What we now want to do is instead of movie recoomendations. we want to create a recommendation system for people skill sets, where if a person has a certain skill say "next.js" in their bio they likely would implicitly have a skill "typescript" in their bio. Even if not explicitly stated. 
- The  goal is to get probabilities for each skill of all skills that all users have.
    - 0 -- doesn't have
    - 1 -- has this skill in their bio explicitly 
    - (0,1) -- calculated with collaborative filtering

WIP result: https://www.kaggle.com/code/s7frank/collaborative-filtering-deep-dive/


## [WIP] whisper cli 
 see  [This section](../My%20Learning%20Goals/Workflows/work-flow.mdx#whisper%20cli outlineing some things
 as well as https://github.com/7frank/ai-ui-playground/blob/main/tools/whisper-cli/README.md 



> https://chat.openai.com/c/e4cc1ee8-cefb-4bb1-be44-6006ecc257a4



## [WIP] gateway & proxy

one gateway for multiple llm another proxy to handle api-keys

- [openai api quota proxy](https://github.com/AI-Northstar-Tech/openai-proxy
- https://github.com/Portkey-AI/gateway

use case (1)
- [self hosted llm](./Natural%20Language%20Processing/LLM%20Self%20Hosting.md) as a service [Req:G,Prototype:M]
    - 
    - business value
    - api gateway with quota handling
        - [openai api quota proxy](https://github.com/AI-Northstar-Tech/openai-proxy
use case (2*)
- use this gateway from (1) for various other experiments of multiple users
- local copilot alternatives with selfhosted llm as a service
- generate Docs 
- generate Tests


##  [] image-to-code
https://github.com/midudev/image-to-code
