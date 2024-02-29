#!/bin/bash

export GRADIO_SERVER_PORT={{ cookiecutter.container_port }}
export GRADIO_SERVER_NAME=0.0.0.0

exec python3 app.py
