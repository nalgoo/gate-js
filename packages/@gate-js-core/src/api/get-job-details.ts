import { RequestOptionsType, JobDetailsType } from '../types';
import { getBaseUrl } from '../utils/get-base-url';

export async function getJobDetails(
	jobId: number,
	options: RequestOptionsType,
): Promise<JobDetailsType> {
	const requestInit: RequestInit = options.abortSignal ? { signal: options.abortSignal } : {};

	return fetch(`${getBaseUrl(options)}/jobs/${jobId}`, requestInit)
		.then(async (response) => {
			if (!response.ok) {
				throw new Error('Unexpected response');
			}
			return response;
		})
		.then((response) => response.json());
}
