import { OPENAI_API_KEY } from '$env/static/private';

type AvailableModels = 'gpt-3.5-turbo' | 'gpt-4' | 'gpt-4-turbo-preview'; // TODO here we probably want to restrict the available models

type ModelConfigRecord = Record<
	AvailableModels,
	{
		baseUrl: string;
		apiToken: string;
	}
>;
const openaiBaseUrl = 'https://api.openai.com/v1/';
const openAiBaseConfig = { baseUrl: openaiBaseUrl, apiToken: OPENAI_API_KEY };

export const modelConfigRecord: ModelConfigRecord = {
	'gpt-4': openAiBaseConfig,
	'gpt-3.5-turbo': openAiBaseConfig,
	'gpt-4-turbo-preview': openAiBaseConfig
};

// TODO check out npm package "bottleneck for inspiration of other limits
// for example if limit is reached, what do we do? allow low throughput or 429 always
interface Quota {
	tokenLimit: number;
}
export interface ApiKeyData {
	quotas: Record<AvailableModels, Quota>;
}
export function getApiKeyData(key: string): ApiKeyData {
	return {
		quotas: {
			'gpt-3.5-turbo': { tokenLimit: 10000 },
			'gpt-4': { tokenLimit: 1000 },
			'gpt-4-turbo-preview': { tokenLimit: 1000 }
		}
	};
}
