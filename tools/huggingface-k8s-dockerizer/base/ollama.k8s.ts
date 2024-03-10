import {
  Service,
  PersistentVolumeClaim,
  type IVolumeMount,
  type IVolume,
} from "kubernetes-models/v1";
import { Deployment } from "kubernetes-models/apps/v1";
import { Ingress } from "kubernetes-models/networking.k8s.io/v1beta1/Ingress";
import type { Model } from "@kubernetes-models/base";

// `bun run base/ollama.k8s.ts | kubectl apply -`
// Note: if this does not run, (avj traverse ..) its likely the json-schema-travsere packge index.js file is empty .. maybe because bun does fail transpiling the package?

const host = "ollama-application-7frank.internal.jambit.io";
const image = "frank1147/ollama-gpu";
const containerPort = 11434;
const app = "ollama-application";

const volumeMount: IVolumeMount = {
  mountPath: "/root/.ollama/models",
  name: "dshm",
};

const volume: IVolume = {
  name: "dshm",
  persistentVolumeClaim: {
    claimName: "dshm",
  },
};

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
            image,
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
            volumeMounts: [volumeMount],
          },
        ],
        imagePullSecrets: [
          {
            name: "docker.registery.secret",
          },
        ],
        volumes: [volume],
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

import yaml from "js-yaml";

function toYaml<T>(...args: Model<T>[]) {
  return args.map((it) => yaml.dump(it.toJSON())).join("\n---\n\n");
}

const d = toYaml(ingress, service, deployment, pvc);
console.log(d);
