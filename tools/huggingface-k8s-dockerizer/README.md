## What?

Goal Spin up fast clones of gradio repos /spaces on huggingface

> How do i know it is a gradio space?

It has `app.py` `requirements.txt`.

## Notes

https://github.com/cookiecutter/cookiecutter

## dev


### use cookiecutter to create a configuration
`sudo apt install pipx`

`pipx run cookiecutter --output-dir=".barn" --config-file barn/elevenlabs-tts.json templates/gradio/`