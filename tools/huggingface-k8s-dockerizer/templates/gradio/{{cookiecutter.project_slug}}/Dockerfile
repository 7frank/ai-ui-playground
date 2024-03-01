FROM frank1147/huggingface-gradio-base

RUN git clone --depth 1 {{ cookiecutter.repo_url }} /app

WORKDIR /app

RUN if [ ! -f app.py ]; then echo "app.py not found" && exit 1; fi

RUN if [ ! -f requirements.txt ]; then echo "requirements.txt not found" && exit 1; fi

RUN pip install --default-timeout=1000 -r requirements.txt

EXPOSE {{ cookiecutter.container_port }}
#ENV GRADIO_SERVER_PORT={{ cookiecutter.container_port }}
#ENV GRADIO_SERVER_NAME=0.0.0.0

COPY entrypoint.sh ./entrypoint.sh

RUN chmod +x ./entrypoint.sh

ENTRYPOINT ["./entrypoint.sh"]
