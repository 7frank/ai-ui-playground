import { Service,IoK8sApiCoreV1LoadBalancerIngress, PersistentVolumeClaim } from "kubernetes-models/v1";
import { Deployment, } from "kubernetes-models/apps/v1";
import {Ingress} from "kubernetes-models/networking.k8s.io/v1beta1/Ingress"

// Note: if this does not run, (avj traverse ..) its likely the json-schema-travsere packge index.js file is empty .. maybe because bun does fail transpiling the package?

// Define Deployment
const deployment = new Deployment({
  metadata: {
    name: "ollama-application",
  },
  spec: {
    replicas: 1,
    selector: {
      matchLabels: {
        app: "ollama-application",
      },
    },
    template: {
      metadata: {
        labels: {
          app: "ollama-application",
        },
      },
      spec: {
        containers: [
          {
            name: "ollama-application",
            image: "frank1147/ollama-gpu",
            ports: [
              {
                name: "http",
                containerPort: 11434,
              },
            ],
            resources: {
              limits: {
                cpu: "4",
                memory: "32Gi",
              },
              requests: {
                cpu: "4",
                memory: "32Gi",
              },
            },
            imagePullPolicy: "IfNotPresent",
            volumeMounts: [
              {
                mountPath: "/root/.ollama/models",
                name: "dshm",
              },
            ],
          },
        ],
        imagePullSecrets: [
          {
            name: "docker.registery.secret",
          },
        ],
        volumes: [
          {
            name: "dshm",
            persistentVolumeClaim: {
              claimName: "dshm",
            },
          },
        ],
      },
    },
  },
});

// Define Service
const service = new Service({
  metadata: {
    name: "ollama-application",
  },
  spec: {
    type: "ClusterIP",
    selector: {
      app: "ollama-application",
    },
    ports: [
      {
        name: "http",
        port: 8080,
        targetPort: 11434,
      },
    ],
    sessionAffinity: "ClientIP",
  },
});

// Define Ingress
const ingress = new Ingress({
  metadata: {
    name: "ollama-application-ingress",
    annotations: {
      "nginx.ingress.kubernetes.io/affinity": "cookie",
      "nginx.ingress.kubernetes.io/affinity-mode": "persistent",
      "nginx.ingress.kubernetes.io/use-regex": "true",
    },
  },
  spec: {
    ingressClassName: "internal-nginx",
    tls: [
      {
        hosts: ["ollama-application-7frank.internal.jambit.io"],
      },
    ],
    rules: [
      {
        host: "ollama-application-7frank.internal.jambit.io",
        http: {
          paths: [
            {
              pathType: "Prefix",
              path: "/",
              backend: {
                serviceName:"ollama-application",
                servicePort: "http",
       
              },
            },
          ],
        },
      },
    ],
  },
});



// Define PersistentVolumeClaim
const pvc = new PersistentVolumeClaim({
  metadata: {
    name: "dshm",
  },
  spec: {
    storageClassName: "gpu-local-ssd",
    accessModes: ["ReadWriteOnce"],
    resources: {
      requests: {
        storage: "10Gi",
      },
    },
  },
});


import yaml from 'js-yaml';
const d=yaml.dump(service.toJSON())
console.log(d);
// Export or use the defined Kubernetes objects

// console.log(service);
// console.log(ingress);
// console.log(pvc);

