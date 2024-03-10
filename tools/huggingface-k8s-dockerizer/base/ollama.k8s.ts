import {
  Service,
  IoK8sApiCoreV1LoadBalancerIngress,
  PersistentVolumeClaim,
} from "kubernetes-models/v1";
import { Deployment } from "kubernetes-models/apps/v1";
import { Ingress } from "kubernetes-models/networking.k8s.io/v1beta1/Ingress";
import type { Model, TypeMeta } from "@kubernetes-models/base";

const containerPort = 11434;
const host = "ollama-application-7frank.internal.jambit.io";

const app = "ollama-application";
// Note: if this does not run, (avj traverse ..) its likely the json-schema-travsere packge index.js file is empty .. maybe because bun does fail transpiling the package?


// `bun run base/ollama.k8s.ts | kubectl apply -`

// Define Deployment
const deployment = new Deployment({
  metadata: {
    name: app,
  },
  spec: {
    replicas: 1,
    selector: {
      matchLabels: {
        app,
      },
    },
    template: {
      metadata: {
        labels: {
          app,
        },
      },
      spec: {
        containers: [
          {
            name: app,
            image: "frank1147/ollama-gpu",
            ports: [
              {
                name: "http",
                containerPort: containerPort,
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
    name: app,
  },
  spec: {
    type: "ClusterIP",
    selector: {
      app,
    },
    ports: [
      {
        name: "http",
        port: 8080,
        targetPort: containerPort,
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
        hosts: [host],
      },
    ],
    rules: [
      {
        host: host,
        http: {
          paths: [
            {
              pathType: "Prefix",
              path: "/",
              backend: {
                serviceName: app,
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

import yaml from "js-yaml";

function toYaml<T>(...args: Model<T>[]) {
  return args.map((it) => yaml.dump(it.toJSON())).join("\n---\n\n");
}

const d = toYaml(ingress,service,deployment,pvc)
console.log(d);
// Export or use the defined Kubernetes objects

// console.log(service);
// console.log(ingress);
// console.log(pvc);
