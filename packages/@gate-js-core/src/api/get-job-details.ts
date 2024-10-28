import { JobDetailsType, JobNotFoundType, RequestOptionsType } from '../types';
import { getBaseUrl } from '../utils/get-base-url';

export async function getJobDetails(
	jobId: number,
	options: RequestOptionsType,
): Promise<JobDetailsType | JobNotFoundType> {
	const requestInit: RequestInit = options.abortSignal ? { signal: options.abortSignal } : {};

	const response = await fetch(`${getBaseUrl(options)}/jobs/${jobId}`, requestInit);

	if (response.status === 404) {
		const error:JobNotFoundType = {
			jobId,
			error: 'not-found',
		};
		return error;
	}

	if (!response.ok) {
		throw new Error('Unexpected response');
	}

	return response.json();
}
