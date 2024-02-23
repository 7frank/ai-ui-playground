## overview
try to have a gateay / proxy that allows to ahve multiple llm behind it and have control over resources by generating token per use

- https://portkey.ai/features/ai-gateway
- https://github.com/AI-Northstar-Tech/openai-proxy


## develop
`npm run build`
`npm run start`

start a postgres instance
```bash
source .env && docker run --name aiProxyPostgresDb --network=host -p 5432:5432 -e POSTGRES_USER=$DB_USERNAME -e POSTGRES_PASSWORD=$DB_PASSWORD -e POSTGRES_DB=$DB_NAME -d postgres
```

psql -U $DB_USERNAME -p 5432 -d $DB_NAME -h localhost