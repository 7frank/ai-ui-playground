## overview
try to have a gateay / proxy that allows to ahve multiple llm behind it and have control over resources by generating token per use

- https://portkey.ai/features/ai-gateway
- https://github.com/AI-Northstar-Tech/openai-proxy


## develop
`docker build -t 7frank/openai-quota-proxy .`
`docker run -d -p 5000:5000 --name openai-quota-proxy --env-file .env 7frank/openai-quota-proxy`

build and tag it as 7frank/openai-quota-proxy run it too