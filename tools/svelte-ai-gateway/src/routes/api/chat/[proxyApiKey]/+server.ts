


import { error,json } from '@sveltejs/kit';
import { getApiKeyData, modelConfigRecord } from '../ApiKeyData.js';
import OpenAI from "openai";
import { OPENAI_API_KEY } from '$env/static/private';





/** @type {import('./$types').RequestHandler} */
export async function POST({ params,request }) {
    const { proxyApiKey} = params;

    // TODO read and alter write api key data token count to restrict access when quota is exceeded
    const apiKeyData=getApiKeyData(proxyApiKey)


    const m="gpt-3.5-turbo"
   const config=modelConfigRecord[m]

   const openai = new OpenAI({baseURL:config.baseUrl,apiKey:OPENAI_API_KEY});

   // request.body.message
   const stream = await openai.chat.completions.create({
    model: m,
    messages: [{ role: "user", content: "Say this is a test" }],
  //  stream: true,
});

	return json({
        apiKey: proxyApiKey,
        choices:stream.choices
    });
}