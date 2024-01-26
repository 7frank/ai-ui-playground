import { extendType } from "cmd-ts";
import { ReadStreamType } from "./ReadStreamType";
import { readStreamToString } from "./readStreamToString";

export const JSONType = extendType(ReadStreamType, {
  async from(inputStream) {
    const t = await readStreamToString(inputStream);

    return JSON.parse(t);
  },
});
