import { error, json } from '@sveltejs/kit';
import { getApiKeyData, modelConfigRecord } from '../ApiKeyData.js';
import OpenAI from 'openai';
import { OPENAI_API_KEY } from '$env/static/private';
import { MessageContent } from 'deep-chat/dist/types/messages.d';

/** @type {import('./$types').RequestHandler} */
export async function POST({ params, request }) {
	const { proxyApiKey } = params;

	// TODO read and alter write api key data token count to restrict access when quota is exceeded
	const apiKeyData = getApiKeyData(proxyApiKey);

	const m = 'gpt-3.5-turbo';
	const config = modelConfigRecord[m];

	const openai = new OpenAI({ baseURL: config.baseUrl, apiKey: OPENAI_API_KEY });

	const body = (await request.json()) as { messages: MessageContent[] };
	console.log(body.messages);

	const messages: { role: string; content: string }[] = body.messages.map(({ text, role }) => ({
		role: role!,
		content: text!
	}));

	const stream = await openai.chat.completions.create({
		model: m,
		messages: messages as any
		//  stream: true,
	});

	return json({
		apiKey: proxyApiKey,
		choices: stream.choices
	});
}

export interface ChatResponse {
	apiKey: string;
	choices: OpenAI.Chat.Completions.ChatCompletion.Choice[];
}
