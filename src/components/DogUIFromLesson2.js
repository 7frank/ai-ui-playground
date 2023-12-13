import { client } from "@gradio/client";

/**
 * TODO broken due to changes in gradio client
 *
 */
export async function read(file) {
  console.log("file", file);
  const app = await client(
    "https://7frank-practical-dog-or-cat.hf.space/--replicas/jgsxp/"
  );

  console.log("foo");
  const result = await app.predict("/predict", [
    file, // blob in 'img' Image component
  ]);
  console.log("bar");
  console.log(result.data);
  // const label = json["data"][0]["confidences"][0]["label"];
  // results.innerHTML = `<br/><img src="${reader.result}" width="300"> <p>${label}</p>`;
}

// export async function read2() {
//   const response_0 = await fetch(
//     "https://raw.githubusercontent.com/gradio-app/gradio/main/test/test_files/bus.png"
//   );
//   const exampleImage = await response_0.blob();

//   const app = await client(
//     "https://7frank-practical-dog-or-cat.hf.space/--replicas/jgsxp/"
//   );
//   const result = await app.predict("/predict", [
//     exampleImage, // blob in 'img' Image component
//   ]);

//   console.log(result.data);
// }
