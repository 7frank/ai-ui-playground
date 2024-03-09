//import * as pulumi from "@pulumi/pulumi";
import * as k8s from "@pulumi/kubernetes";


const useGpu = false
const usePersistence = false

// PersistentVolumeClaim
if (usePersistence) {
    const pvc = new k8s.core.v1.PersistentVolumeClaim("dshm", {
        metadata: { name: "dshm" },
        spec: {
            storageClassName: "gpu-local-ssd",
            accessModes: [ "ReadWriteOnce" ],
            resources: {
                requests: {
                    storage: "10Gi"
                }
            }
        }
    });
}

// Deployment
const deployment = new k8s.apps.v1.Deployment("ollama-application-deployment", {
    metadata: { name: "ollama-application" },
    spec: {
        selector: { matchLabels: { app: "ollama-application" } },
        replicas: 1,
        template: {
            metadata: { labels: { app: "ollama-application" } },
            spec: {
                containers: [{
                    name: "ollama-application",
                    image: "frank1147/ollama-gpu",
                    ports: [{ name: "http", containerPort: 11434 }],
                    resources: {
                        limits: {
                            cpu: "4",
                            memory: "32Gi",
                            ...(useGpu ? { "nvidia.com/gpu": "1" } : {})
                        },
                        requests: {
                            cpu: "4",
                            memory: "32Gi",
                            ...(useGpu ? { "nvidia.com/gpu": "1" } : {})
                        }
                    },
                    volumeMounts: usePersistence ? [{ mountPath: "/root/.ollama/models", name: "dshm" }] : []
                }],
                volumes: usePersistence ? [{ name: "dshm", persistentVolumeClaim: { claimName: "dshm" }}] : [],
                imagePullSecrets: [{ name: "docker.registery.secret" }],
            }
        }
    }
});

// Service
const service = new k8s.core.v1.Service("ollama-application-service", {
    metadata: { name: "ollama-application" },
    spec: {
        type: "ClusterIP",
        selector: { app: "ollama-application" },
        ports: [{ name: "http", port: 8080, targetPort: 11434 }],
        sessionAffinity: "ClientIP"
    }
});

// Ingress
const ingress = new k8s.networking.v1.Ingress("ollama-application-ingress", {
    metadata: { 
        name: "ollama-application-ingress",
        annotations: {
            "nginx.ingress.kubernetes.io/affinity": "cookie",
            "nginx.ingress.kubernetes.io/affinity-mode": "persistent",
            "nginx.ingress.kubernetes.io/use-regex": "true"
        }
    },
    spec: {
        ingressClassName: "internal-nginx",
        tls: [{ hosts: ["ollama-application-7frank.internal.jambit.io"] }],
        rules: [{
            host: "ollama-application-7frank.internal.jambit.io",
            http: {
                paths: [{
                    pathType: "Prefix",
                    path: "/",
                    backend: { 
                        service: { 
                            name: "ollama-application",
                            port: { name: "http" }
                        }
                    }
                }]
            }
        }]
    }
});


console.log("foo")