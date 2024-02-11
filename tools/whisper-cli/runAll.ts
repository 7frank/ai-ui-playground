import { $ } from "bun";

//await $`bun recordAudio.ts /tmp/f1.wav`
let answer=await $`bun ./script.ts /tmp/f1.wav`.text()
answer="\"create a command to curl api.duckduckgo.com to answer the following question:"+answer+"\""
console.log(answer)
//await $`jee sh exec -q "${answer}"` 


// https://api.duckduckgo.com/?q=

// TODO run like ..
//jee sh exec -q $(bun runAll.ts) 