---
title: Overview of Kong in Kubernetes
---

This document provides an in-depth summary of utilizing Kong within a Kubernetes environment, detailing its capabilities both as an Ingress Controller and as a standalone API Gateway.

## Kong as an Ingress Controller

When Kong is deployed as an Ingress Controller in Kubernetes, it acts as a powerful bridge between external HTTP/HTTPS traffic and your cluster's services based on Ingress resource configurations.

### Key Features and Capabilities:

- **Dynamic Configuration**: Kong listens for Kubernetes Ingress resources and automatically configures its internal routing to forward external requests to the correct services within the cluster.
- **Custom Resource Definitions (CRDs)**: Kong extends Kubernetes' native capabilities with Custom Resource Definitions (CRDs), allowing users to define detailed routing rules, apply plugins at the ingress level, and manage API consumers directly from Kubernetes YAML files. Important CRDs include:
  - `KongPlugin`: Enables the application of plugins to routes, services, or consumers directly within Kubernetes, facilitating functionalities like authentication, rate-limiting, and transformations.
  - `KongIngress`: Offers finer control over load balancing, proxy behavior, and routing beyond the standard Ingress resource capabilities.
  - `KongConsumer`: Represents a consumer of your APIs, allowing for authentication and personalized plugin configurations.
  - `KongCredential`: Stores sensitive information like API keys or JWT tokens for KongConsumers.

### Advantages:

- Seamlessly integrates with Kubernetes' native operations, simplifying the management of ingress traffic and API security.
- Enables declarative configuration of complex API management features using standard Kubernetes manifests.

## Kong as a Standalone API Gateway

Outside of Kubernetes' Ingress mechanism, Kong shines as a versatile API Gateway, managing and securing APIs across different environments.

### Configuration Methods:

- **Admin API**: Provides a comprehensive RESTful interface for configuring Kong, ideal for dynamic environments and automation.
- **Declarative Configuration (`kong.yml`)**: Allows for the entire configuration of Kong (services, routes, plugins, consumers) to be defined in a single YAML or JSON file, which can be loaded when starting Kong. This method is particularly useful for version-controlled configurations and CI/CD pipelines.
- **Kong Manager**: An intuitive GUI for managing Kong configurations, available in the Enterprise version, facilitating easy access for non-technical users to configure routes, services, and plugins.

### Exposing Kong to External Traffic:

To function as an API Gateway in Kubernetes, Kong needs to be exposed to receive external traffic. This is typically achieved through Kubernetes Services of type `LoadBalancer` or `NodePort`, allowing Kong to securely manage API traffic entering the cluster.

## Layered Ingress Control with Secondary Ingress Controllers

In complex scenarios, Kong may be part of a layered ingress architecture, working alongside other Ingress Controllers within the same Kubernetes cluster.

### Configuration Steps:

1. **Internal Service Exposure**: Kong is exposed within the cluster via a Kubernetes Service, usually of type `ClusterIP`, making it accessible to other components within the cluster.
2. **Ingress Resource for Secondary Controller**: A separate Ingress resource, managed by the secondary Ingress Controller (e.g., Nginx), is configured to route specific external traffic to Kong's internal service. This setup allows leveraging specific features of another Ingress Controller while still utilizing Kong's API management capabilities.

### Annotations and Ingress Controller Selection:

- Kubernetes Ingress resources use annotations to specify which Ingress Controller should process them. This system allows multiple Ingress Controllers to coexist within the same cluster without conflict.
- The selection of an Ingress Controller is crucial for ensuring the correct processing of ingress traffic according to the specified rules and annotations.

