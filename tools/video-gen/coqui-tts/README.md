# custom-coqui-tts

Scripts to build % run a custom coqui-tts-cpu on k8s.

https://github.com/coqui-ai/TTS/pkgs/container/tts-cpu#docker-image

```bash

docker tag 7frank/custom-coqui-tts:latest frank1147/custom-coqui-tts:latest
docker push frank1147/custom-coqui-tts:latest

# TODO upload iamge & deploy on k8s
https://docs.github.com/en/enterprise-server@3.10/packages/working-with-a-github-packages-registry/working-with-the-docker-registry
cat ~/TOKEN.txt | docker login docker.HOSTNAME -u USERNAME --password-stdin


kubectl apply -f k8s/deployment.yaml
kubectl apply -f k8s/ingress.yaml

```