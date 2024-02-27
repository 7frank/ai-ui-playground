FROM ghcr.io/coqui-ai/tts-cpu:dbf1a08a0d4e47fdad6172e433eeb34bc6b13b4e

WORKDIR /app

EXPOSE 5002

CMD ["-c", "python3 TTS/server/server.py --model_name tts_models/en/vctk/vits"]
