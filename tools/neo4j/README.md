

# used dataset
https://github.com/neo4j-graph-examples/graph-data-science

https://github.com/neo4j-graph-examples/graph-data-science/raw/main/data/graph-data-science-40.dump

```
wget https://github.com/neo4j-graph-examples/graph-data-science/raw/main/data/graph-data-science-40.dump -O $HOME/neo4j/import/graph-data-science-40.dump

```


# start with docker

https://neo4j.com/developer/docker-run-neo4j/

```bash

docker rm testneo4j

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


`neo4j-admin database load --verbose --from-path=/var/lib/neo4j/import/ test1`
import failes 
> Failed to load database 'test1': Can not read store version of database test1Load failed for databases: 'test1'
> org.neo4j.cli.CommandFailedException: Load failed for databases: 'test1'
>         at org.neo4j.commandline.dbms.LoadCommand.checkFailure(LoadCommand.java:224)
>         at org.neo4j.commandline.dbms.LoadCommand.loadDump(LoadCommand.java:212)
>         at org.neo4j.commandline.dbms.LoadCommand.execute(LoadCommand.java:150)
>         at org.neo4j.cli.AbstractCommand.call(AbstractCommand.java:92)
>         at org.neo4j.cli.AbstractCommand.call(AbstractCommand.java:37)
>         at picocli.CommandLine.executeUserObject(CommandLine.java:2041)
>         at picocli.CommandLine.access$1500(CommandLine.java:148)
>         at picocli.CommandLine$RunLast.executeUserObjectOfLastSubcommandWithSameParent(CommandLine.java:2461)
>         at picocli.CommandLine$RunLast.handle(CommandLine.java:2453)
>         at picocli.CommandLine$RunLast.handle(CommandLine.java:2415)
>         at picocli.CommandLine$AbstractParseResultHandler.execute(CommandLine.java:2273)
>         at picocli.CommandLine$RunLast.execute(CommandLine.java:2417)
>         at picocli.CommandLine.execute(CommandLine.java:2170)
>         at org.neo4j.cli.AdminTool.execute(AdminTool.java:94)
>         at org.neo4j.cli.AdminTool.main(AdminTool.java:82)
> Caused by: java.lang.IllegalStateException: Can not read store version of database test1
>         at org.neo4j.commandline.dbms.StoreVersionLoader.loadStoreVersionAndCheckDowngrade(StoreVersionLoader.java:95)
>         at org.neo4j.dbms.archive.Loader.getStoreVersion(Loader.java:138)
>         at org.neo4j.commandline.dbms.LoadDumpExecutor.execute(LoadDumpExecutor.java:82)
>         at org.neo4j.commandline.dbms.LoadCommand.loadDump(LoadCommand.java:202)
>         ... 13 more
> Caused by: java.lang.IllegalArgumentException: Unable to read store with version 'SF4.0.0'. Please make sure that database is migrated properly to be supported by current version of neo4j.
>         at org.neo4j.kernel.impl.store.LegacyMetadataHandler.storeIdFromLegacyMetadata(LegacyMetadataHandler.java:146)
>         at org.neo4j.kernel.impl.store.LegacyMetadataHandler.readMetadata44FromStore(LegacyMetadataHandler.java:98)
>         at org.neo4j.kernel.impl.storemigration.RecordStoreVersionCheck.readVersion(RecordStoreVersionCheck.java:74)
>         at org.neo4j.kernel.impl.storemigration.RecordStoreVersionCheck.getAndCheckUpgradeTargetVersion(RecordStoreVersionCheck.java:143)
>         at org.neo4j.commandline.dbms.StoreVersionLoader.loadStoreVersionAndCheckDowngrade(StoreVersionLoader.java:92)
>         ... 16 more