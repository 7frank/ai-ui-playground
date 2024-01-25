

# used dataset
https://github.com/neo4j-graph-examples/graph-data-science

https://github.com/neo4j-graph-examples/graph-data-science/raw/main/data/graph-data-science-40.dump

```
wget https://github.com/neo4j-graph-examples/graph-data-science/raw/main/data/graph-data-science-40.dump -O $HOME/neo4j/import/graph-data-science-40.dump

```


# start with docker

https://neo4j.com/developer/docker-run-neo4j/

```bash
docker run \
    --name testneo4j \
    -p7474:7474 -p7687:7687 \
    -d \
    -v $HOME/neo4j/data:/data \
    -v $HOME/neo4j/logs:/logs \
    -v $HOME/neo4j/import:/var/lib/neo4j/import \
    -v $HOME/neo4j/plugins:/plugins \
    --env NEO4J_AUTH=neo4j/password \
    neo4j:latest
```

```
docker exec -it testneo4j bash

## import currently fails
neo4j-admin database load --from-path=/var/lib/neo4j/import/ graph-data-science-40

# open cyper shell
cypher-shell -u neo4j -p password
SHOW DATABASES;

#use default database before deleting other
:use neo4j
# cannot dro database
DROP DATABASE graph-data-science-40

:exit

```

goto http://localhost:7474/browser/

> user `neo4j`
> pass: `password`


## troubleshooting


neo4j restart