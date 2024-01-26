---
title: Client Server Contracts
---

## Introduction

OpenAPI, tRPC, and GraphQL are all tools used for defining APIs, but they have different focuses and use cases:

    OpenAPI: It's a specification for defining RESTful APIs. OpenAPI allows you to describe your entire API, including endpoints, request/response schemas, authentication, and more, in a machine-readable format. Tools can then use this specification to generate documentation, client libraries, and server stubs in various programming languages.

    tRPC: tRPC stands for TypeScript RPC and is designed specifically for TypeScript developers. It allows you to create typesafe APIs without the need to define a schema like in GraphQL or OpenAPI. tRPC uses the TypeScript type system to enforce contract compliance between the client and server, automatically generating the types based on the server-side implementation.

    GraphQL: This is a query language for APIs and a runtime for executing those queries. Unlike OpenAPI and tRPC, GraphQL allows clients to request exactly what they need, no more and no less. It's not tied to a specific database or storage engine and is instead backed by your existing code and data.

Each of these tools has its own strengths and is suited for different kinds of applications and requirements. OpenAPI is great for detailed RESTful API definitions, tRPC excels in TypeScript environments for easy development without separate API contracts, and GraphQL offers flexibility and efficiency in data fetching.

> Approaches like tRPC offer a streamlined developer experience, particularly for TypeScript users, by enabling automatic generation of types based on server-side implementations, thereby eliminating the need for separate API contracts. This tight integration between the client and server enhances type safety and reduces boilerplate code. In contrast, GraphQL provides flexibility in data fetching, allowing clients to specify exactly what data they need, which can optimize network usage and improve performance. OpenAPI, on the other hand, excels in defining RESTful APIs in a detailed, standardized format, making it ideal for generating comprehensive documentation and client/server code across various languages. Each of these approaches offers unique advantages depending on the specific needs and context of the development project.



## Example: Frontend Typescript & Backend Kotlin


For integrating input validation in a setup using GraphQL with TypeScript on the client-side and Java or Kotlin on the server-side, there are several tools and approaches you can consider:

    GraphQL Code Generator with TypeScript Validation Schema Plugin: This is a plugin for GraphQL Codegen that generates form validation schemas (like Yup or Zod) based on your GraphQL schema for use in a TypeScript client application. This tool can automate the generation of client-side validation logic that aligns with your GraphQL schema, helping maintain consistency between the client and the server. More details are available on the GraphQL Code Generator website.

    GraphQL Codegen Kotlin Plugin: For the server-side with Kotlin (or Java), you can use the GraphQL Codegen Kotlin plugin. This plugin generates Kotlin classes for enums and input types based on your GraphQL schema. It provides a type-safe way to handle GraphQL input types in Kotlin, which can be beneficial for input validation on the server-side. For more information, you can visit the GraphQL Code Generator website.

    TypeGraphQL with Class Validator: TypeGraphQL offers built-in support for argument and input validation using the class-validator library. This approach is handy when working with TypeScript on the server-side, as it allows you to use decorators to define validation rules directly in your GraphQL types. While this approach is specific to a TypeScript server, it can still be useful for scenarios where you have TypeScript in your stack. Learn more about this approach on the TypeGraphQL website.

These tools and methods can help you establish a robust validation system across your client and server applications, ensuring data integrity and consistency. Remember that while GraphQL itself ensures the correct types and structures of data, these additional tools can help enforce more complex validation rules, like string lengths, numerical ranges, or specific format requirements.




