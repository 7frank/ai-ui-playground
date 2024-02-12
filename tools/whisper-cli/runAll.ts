import { $ } from "bun";


// use like:  bun runAll.ts |  jee sh exec -q -

let answer=await $`bun ./script.ts /tmp/f1.wav`.text()
answer="\"create a command to curl api.duckduckgo.com to answer the following question:"+answer+"\""
console.log(answer)



// const cmd=`curl 'http://api.duckduckgo.com/?q=${escape(answer)}&format=json&pretty=1' --compressed -H 'User-Agent: Mozilla/5.0 (X11; Linux x86_64; rv:121.0) Gecko/20100101 Firefox/121.0' -H 'Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8' -H 'Accept-Language: en-US,en;q=0.5' -H 'Accept-Encoding: gzip, deflate' -H 'Connection: keep-alive' -H 'Upgrade-Insecure-Requests: 1' -H 'Pragma: no-cache' -H 'Cache-Control: no-cache'`
// console.log(cmd)
// const j=await $`${cmd}`.text()

// console.log(j)
