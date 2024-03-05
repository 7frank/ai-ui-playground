

## gradio

The "gradio" template is suitable for huggingface or similar repositories that use gradio.

Goal Spin up fast clones of gradio repos /spaces on huggingface. Use an adapter top connect to the API exposed by gradio which generates an /info endpoint, that contains a propriatary endpoint spec.

> How do i know it is a gradio space?

It has `app.py` & `requirements.txt`.


## hub

Use a hub template if you want to have a quick integration with an image from a docker registry.

## image

Not implemented but would serve as more configurable docker image than its "hub" counterpart.