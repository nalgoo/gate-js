import { FormDefinitionType } from '../types';

export async function getFormDefinition(url: string, signal?: AbortSignal): Promise<FormDefinitionType> {
	return fetch(url, { signal })
		.then((response) => response.json());
}
