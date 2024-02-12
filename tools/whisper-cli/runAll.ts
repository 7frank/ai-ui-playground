import { $ } from "bun";


// Note:  use like:  bun runAll.ts |  jee sh exec -q -

await $`bun recordAudio.ts /tmp/f1.wav`
let answer=await $`bun ./script.ts /tmp/f1.wav`.text()
//answer="\"create a command to curl api.duckduckgo.com to answer the following question:"+answer+"\""
console.log(answer)

