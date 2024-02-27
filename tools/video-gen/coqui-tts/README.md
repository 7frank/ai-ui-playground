# custom-coqui-tts

Scripts to build % run a custom coqui-tts-cpu on k8s.

https://github.com/coqui-ai/TTS/pkgs/container/tts-cpu#docker-image

```bash

> get pat https://hub.docker.com/settings/security

pass docker/pat | docker login  -u frank1147 --password-stdin


docker tag 7frank/custom-coqui-tts:latest frank1147/custom-coqui-tts:latest
docker push frank1147/custom-coqui-tts:latest

# TODO upload iamge & deploy on k8s



kubectl apply -f k8s/deployment.yaml
kubectl apply -f k8s/ingress.yaml

```