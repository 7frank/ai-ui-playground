import { modelConfigRecord } from '../api/chat/ApiKeyData';


/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
	// Filter out sensitive information and prepare the data for the client
	const filteredModels = Object.entries(modelConfigRecord).map(([modelName, config]) => ({
		modelName,
		baseUrl: config.baseUrl
		// Do not include the secret or any sensitive info
	}));

	return {
		models: filteredModels
	};
}
