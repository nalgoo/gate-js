import { getBaseUrl } from '../utils/get-base-url';
import {
	ApplicationDataType,
	RequestOptionsType,
} from '../types';
import { formatApplicationBody } from '../utils/format-application-body';

export async function createGlobalApplication(
	applicationData: ApplicationDataType,
	options: RequestOptionsType,
): Promise<boolean> {
	const url = `${getBaseUrl(options)}/import`;

	const body = await formatApplicationBody(applicationData);

	const requestInit: RequestInit = {
		method: 'POST',
		body,
		headers: {
			'Content-Type': 'application/json',
		},
		...(options.abortSignal ? { signal: options.abortSignal } : {}),
	};

	return fetch(url, requestInit)
		.then((response) => {
			if (!response.ok) {
				throw new Error('Unexpected response');
			}
			return true;
		})
		.catch(() => false);
}
