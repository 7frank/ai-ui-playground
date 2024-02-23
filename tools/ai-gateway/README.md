## overview
try to have a gateay / proxy that allows to ahve multiple llm behind it and have control over resources by generating token per use

- https://portkey.ai/features/ai-gateway
- https://github.com/AI-Northstar-Tech/openai-proxy


## develop
`npm run build`
`npm run start`

start a postgres instance 
(TODO `bun db-start` will not work as of now)
```bash
source .env && docker run --name aiProxyPostgresDb --network=host -p 5432:5432 -e POSTGRES_USER=$DB_USERNAME -e POSTGRES_PASSWORD=$DB_PASSWORD -e POSTGRES_DB=$DB_NAME -d postgres
```


## generate proxy api keys for openai

run `npm run attach`
and in the shell of the container `python ./create_api_key.py -q 5` to get something like the following:

> Enter a username: foo
> Enter the admin username: admin
> Enter the admin password: 1234
> Created new API key: foo_daf44c40-6269-495b-b1ec-576b26f6ee02 with initial quota: 5
> foo_daf44c40-6269-495b-b1ec-576b26f6ee02



## test the key

```bash 
export PROXYKEY=foo_daf44c40-6269-495b-b1ec-576b26f6ee02
curl -X POST "http://localhost:5000/$PROXYKEY/v1/chat/completions" \
     -H "Content-Type: application/json" \
     --data '{
       "model": "gpt-3.5-turbo",
       "messages": [
         {"role": "user", "content": "say 'hello'"}
       ]
     }'

```





## debug

psql -U $DB_USERNAME -p 5432 -d $DB_NAME -h localhost