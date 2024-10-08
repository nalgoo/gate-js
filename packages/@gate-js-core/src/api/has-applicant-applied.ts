import { UniqueApplicantDataType, RequestOptionsType } from '../types';
import { getBaseUrl } from '../utils/get-base-url';

export async function hasApplicantApplied(
	applicant: UniqueApplicantDataType,
	jobId: number,
	options: RequestOptionsType,
): Promise<boolean> {
	const requestInit: RequestInit = {
		cache: 'no-store',
		...(options.abortSignal ? { signal: options.abortSignal } : {}),
	};

	const params = new URLSearchParams(applicant);

	return fetch(`${getBaseUrl(options)}/jobs/${jobId}/applicant?${params}`, requestInit)
		.then((response) => response.json())
		.then((json) => !!json.exists);
}
