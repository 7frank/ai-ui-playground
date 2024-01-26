import { extendType } from "cmd-ts";
import { ReadStreamType } from "./ReadStreamType";
import gunzip from "gunzip-maybe";
import tar from "tar-stream";
import stream from "stream";
import { log } from "../../log";
import Rx from "rxjs";

export const GzType = extendType(ReadStreamType, {
  async from(inputStream) {
    return inputStream.pipe(gunzip());
  },
});

/**
 * Take the tar gz and convert it into a rxjs subject
 */

export const TarGzType = extendType(GzType, {
  async from(tarStream) {
    var eventStream = new Rx.Subject();

    // header is the tar header
    // stream is the content body (might be an empty stream)
    // call next when you are done with this entry
    const extract = tar.extract();
    extract.on("entry", function (header, stream, next) {
      const chunks: Buffer[] = [];
      if (header.type == "file") {
        stream.on("data", (chunk) => chunks.push(Buffer.from(chunk)));

        stream.on("end", function () {
          const content = Buffer.concat(chunks).toString("utf8");

          eventStream.next({ name: header.name, content });

          next(); // ready for next entry
        });
      } else
        stream.on("end", function () {
          next(); // ready for next entry
        });

      stream.resume(); // just auto drain the stream
    });

    extract.on("finish", function () {
      eventStream.complete();
      log("finished extracting TarGzType");
    });

    tarStream.pipe(extract);
    return eventStream;
  },
});
