#!/bin/bash

export GRADIO_SERVER_PORT=8080
export GRADIO_SERVER_NAME=0.0.0.0

exec python3 app.py
