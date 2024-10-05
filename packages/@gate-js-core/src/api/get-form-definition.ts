import { FormDefinition } from '../types/form-definition';

export async function getFormDefinition(url: string, signal?: AbortSignal): Promise<FormDefinition> {
	return fetch(url, { signal })
		.then((response) => response.json());
}
