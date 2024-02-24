
import type { Handle } from '@sveltejs/kit';

type AvailableModels = 'gpt-3.5-turbo' | 'gpt-4' | 'gpt-4-turbo-preview' | string; // TODO here we probably want to restrict the available models

interface Quota {
	tokenLimit: number;
	// TODO other options eg from "bottleneck" library
}

interface ApiKeyData {
	quotas: Record<AvailableModels, Quota>;
}

function getApiKeyData(key: string): ApiKeyData {
	return {
		quotas: {
			'gpt-3.5-turbo': { tokenLimit: 10000 }
		}
	};
}


export async function handle({ event, resolve }:Handle) {
	const apiKey = event.request.headers.get('x-api-key');

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
