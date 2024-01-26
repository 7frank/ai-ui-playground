import { Stream } from "stream";

export async function readStreamToString(s: Stream): Promise<string> {
  return new Promise((resolve, reject) => {
    let str = "";
    s.on("data", (x) => (str += x.toString()));
    s.on("error", (e) => reject(e));
    s.on("end", () => resolve(str));
  });
}
