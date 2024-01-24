---
title: Graph Database Query Languages
---


## 1. Cypher
- **Developed by**: Neo4j
- **Features**: Expressive and efficient for graph traversals
- **Example**:
  ```cypher
  MATCH (n:Person)-[r:KNOWS]->(m)
  WHERE n.name = 'Alice'
  RETURN m.name
  ```

## 2. Gremlin
- **Part of**: Apache TinkerPop
- **Features**: A functional, data-flow language for traversing graphs
- **Example**:
  ```gremlin
  g.V().has('name', 'Alice').out('knows').values('name')
  ```

## 3. SPARQL
- **Use**: Querying RDF (Resource Description Framework) databases
- **Features**: Complex querying of interconnected RDF data
- **Example**:
  ```sparql
  SELECT ?friend
  WHERE {
    ?person foaf:name "Alice".
    ?person foaf:knows ?friend.
  }
  ```

## 4. GraphQL
- **Developed by**: Facebook
- **Features**: Efficient querying of interconnected data, commonly used for APIs
- **Example**:
  ```graphql
  {
    user(id: "Alice") {
      friends {
        name
      }
    }
  }
  ```

## 5. GSQL
- **Proprietary language of**: TigerGraph
- **Features**: Designed for complex patterns and analytics on large graphs
- **Example**:
  ```gsql
  CREATE QUERY example() FOR GRAPH MyGraph {
    /* GSQL query logic here */
  }
  ```

## 6. AQL (ArangoDB Query Language)
- **Native to**: ArangoDB, a multi-model database
- **Features**: Supports graph, document, and key/value data models
- **Example**:
  ```aql
  FOR v, e IN 1..1 OUTBOUND 'vertices/Alice' edges
  RETURN {vertex: v, edge: e}
  ```

## 7. OrientDB SQL
- **Extension of**: SQL for OrientDB
- **Features**: Supports graph queries with SQL-like syntax
- **Example**:
  ```sql
  SELECT FROM Person WHERE name = 'Alice'
  ```

## 8. CYPHERQL
- **Variant of**: Cypher, used in SAP HANA Graph
- **Features**: Tailored for graph processing in SAP HANA
- **Example**:
  ```cypherql
  GRAPH g MATCH (n) RETURN n LIMIT 10
  ```