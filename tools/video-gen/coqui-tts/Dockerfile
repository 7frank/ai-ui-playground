FROM ghcr.io/coqui-ai/tts-cpu:dbf1a08a0d4e47fdad6172e433eeb34bc6b13b4e



COPY download_model.py TTS/server/download_model.py
RUN python3 TTS/server/download_model.py --model_name tts_models/en/vctk/vits

EXPOSE 8080

WORKDIR /root

ENTRYPOINT ["python3", "TTS/server/server.py"]
CMD ["--model_name", "tts_models/en/vctk/vits", "--port", "8080"]