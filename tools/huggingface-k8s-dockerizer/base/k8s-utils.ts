import {
  PersistentVolumeClaim,
  type IVolumeMount,
  type IVolume,
} from "kubernetes-models/v1";
import type { Model } from "@kubernetes-models/base";
import yaml from "js-yaml";

export function toYaml<T>(...args: (Model<T> | undefined)[]) {
  const filtered = args.filter((it) => !!it);
  filtered.forEach((it) => it!.validate());

  return filtered.map((it) => yaml.dump(it!.toJSON())).join("\n---\n\n");
}
export function getVolumeConfig({
  name = "dshm",
  mountPath = "/root/.ollama/models",
  storage = "10Gi",
  storageClassName = "gpu-local-ssd",
}: {
  name?: string;
  mountPath?: string;
  storage?: string;
  storageClassName?: string;
}) {
  const volumeMount: IVolumeMount = {
    mountPath,
    name,
  };

  const volume: IVolume = {
    name: name,
    persistentVolumeClaim: {
      claimName: name,
    },
  };

  // Define PersistentVolumeClaim
  const pvc = new PersistentVolumeClaim({
    metadata: {
      name,
    },
    spec: {
      storageClassName,
      accessModes: ["ReadWriteOnce"],
      resources: {
        requests: {
          storage,
        },
      },
    },
  });
  return { volumeMount, volume, pvc };
}
