FROM python:3.8

WORKDIR /root

# Install Git LFS
RUN apt-get update && \
    apt-get install -y git-lfs ffmpeg && \
    git lfs install

# Clone the repository specified in the REPO_URL environment variable
ARG REPO_URL
RUN git clone ${REPO_URL} /app

WORKDIR /app

RUN pip install "gradio<4.0.0,>=3.0.0"
RUN pip install "pydantic==1.10.7"

# Check if app.py exists, fail the build if it does not
RUN if [ ! -f app.py ]; then echo "app.py not found" && exit 1; fi

# Check if requirements.txt exists, fail the build if it does not
RUN if [ ! -f requirements.txt ]; then echo "requirements.txt not found" && exit 1; fi

RUN pip install -r requirements.txt

EXPOSE 7860
#ENV GRADIO_SERVER_PORT=7860
#ENV GRADIO_SERVER_NAME=0.0.0.0

COPY entrypoint.sh ./entrypoint.sh

RUN chmod +x ./entrypoint.sh

ENTRYPOINT ["./entrypoint.sh"]
