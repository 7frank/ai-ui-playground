import type { Handle } from '@sveltejs/kit';

import { type ApiKeyData, getApiKeyData } from './ApiKeyData';

export async function handle({ event, resolve }: Handle) {
	const apiKey = event.request.headers.get('x-api-key');


	console.log(await event.request.clone.json())

	if (!apiKey) {
		// Return an error response if no API key is provided
		return new Response('API Key required', { status: 401 });
	}

	// Retrieve API key data from your database or caching layer
	const apiKeyData: ApiKeyData | null = await getApiKeyData(apiKey);

	// || apiKeyData.quota <= apiKeyData.used
	if (!apiKeyData) {
		// Return an error response if the API key is invalid or quota is exceeded
		return new Response('Invalid API Key or Quota exceeded', { status: 429 });
	}

	const response = await resolve(event);
	response.headers.set('x-custom-header', 'potato');

	return response;
}
