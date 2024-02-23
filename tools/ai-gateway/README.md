## overview
try to have a gateay / proxy that allows to ahve multiple llm behind it and have control over resources by generating token per use

- https://portkey.ai/features/ai-gateway
- https://github.com/AI-Northstar-Tech/openai-proxy


## develop
`docker build -t 7frank/openai-quota-proxy .`
`docker run -d -p 5000:5000 --name openai-quota-proxy --env-file .env 7frank/openai-quota-proxy`

build and tag it as 7frank/openai-quota-proxy run it too


start a postgres instance
```bash
source .env && docker run --name aiProxyPostgresDb -p 5432:5432 -e POSTGRES_USER=$DB_USERNAME -e POSTGRES_PASSWORD=$DB_PASSWORD -e POSTGRES_DB=$DB_NAME -d postgres
```

psql -U $DB_USERNAME -p 5432 -c $DB_NAME -h localhost