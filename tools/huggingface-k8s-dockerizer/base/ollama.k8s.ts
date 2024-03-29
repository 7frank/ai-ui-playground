import {
  Service,
  type IContainer,
  type IResourceRequirements,
  type IToleration,
  type IEnvVar,
} from "kubernetes-models/v1";
import { Deployment } from "kubernetes-models/apps/v1";
import { Ingress } from "kubernetes-models/networking.k8s.io/v1/Ingress";
import { getVolumeConfig, gpuToleration, toYaml } from "./k8s-utils";

// `bun run base/ollama.k8s.ts | k apply -f -`
// Note: if this does not run, (avj traverse ..) its likely the json-schema-travsere packge index.js file is empty .. maybe because bun does fail transpiling the package?

const app = "test-application";
const host = `${app}-7frank.internal.jambit.io`;

// original ollama/ollama image with gpu enabled
// const image = "frank1147/ollama-gpu";
// const env: IEnvVar[] = [];

// ollama gpu MIG fork https://github.com/ollama/ollama/pull/2264
const image = "frank1147/ollama-gpu-source";
const env: IEnvVar[] = [];

const containerPort = 11434;

// TODO create one config for "vllm"

// image: "frank1147/vllm:latest"
// const env:IEnvVar[]=[{name:"MODEL",value:"mistralai/Mistral-7B-Instruct-v0.1"},{name:"EXTRA_ARGS",value:"--tensor-parallel-size 1"}]
// const containerPort = 8080

const hasPersistence = true;
const hasGPU = true;

const { volumeMount, volume, pvc } = getVolumeConfig({
  name: `${app}-dshm`,
  mountPath: "/root/.ollama/models",
  storage: "30Gi",
  storageClassName: "gpu-local-ssd",
});

const requirements: IResourceRequirements = {
  limits: {
    "nvidia.com/gpu": hasGPU ? 1 : 0,
    cpu: "4",
    memory: "32Gi",
  },
  requests: {
    "nvidia.com/gpu": hasGPU ? 1 : 0,
    cpu: "1",
    memory: "4Gi",
  },
};

const container: IContainer = {
  name: app,
  image,
  env,
  ports: [
    {
      name: "http",
      containerPort,
    },
  ],
  resources: requirements,
  imagePullPolicy: "Always",
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
        tolerations: hasGPU ? [gpuToleration] : undefined,
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
    name: `${app}-ingress`,
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
                service: { name: app, port: { name: "http" } },
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
