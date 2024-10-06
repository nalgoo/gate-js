import { JobListItemType, RequestOptionsType } from '../types';
import { getBaseUrl } from '../utils/get-base-url';

export async function getJobList(options: RequestOptionsType): Promise<Array<JobListItemType>> {
	const requestInit: RequestInit = options.abortSignal ? { signal: options.abortSignal } : {};

	return fetch(`${getBaseUrl(options)}/jobs`, requestInit)
		.then((response) => response.json());
}
