import { Service, type IContainer } from "kubernetes-models/v1";
import { Deployment } from "kubernetes-models/apps/v1";
import { Ingress } from "kubernetes-models/networking.k8s.io/v1beta1/Ingress";
import { getVolumeConfig, toYaml } from "./k8s-utils";

// `bun run base/ollama.k8s.ts | kubectl apply -`
// Note: if this does not run, (avj traverse ..) its likely the json-schema-travsere packge index.js file is empty .. maybe because bun does fail transpiling the package?

const host = "ollama-application-7frank.internal.jambit.io";
const image = "frank1147/ollama-gpu";
const containerPort = 11434;
const app = "ollama-application";

const hasPersistence = true;

const { volumeMount, volume, pvc } = getVolumeConfig({
  name: "dshm",
  mountPath: "/root/.ollama/models",
  storage: "10Gi",
  storageClassName: "gpu-local-ssd",
});

const container: IContainer = {
  name: app,
  image,
  ports: [
    {
      name: "http",
      containerPort,
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
  volumeMounts: hasPersistence ? [volumeMount] : undefined,
};
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
        containers: [container],
        imagePullSecrets: [
          {
            name: "docker.registery.secret",
          },
        ],
        volumes: hasPersistence ? [volume] : undefined,
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

const d = toYaml(
  ingress,
  service,
  deployment,
  hasPersistence ? pvc : undefined
);
console.log(d);
