import { JobDetailsType } from '../types/types';

export async function getJobDetails(
	jobId: number,
	baseUrl = 'https://ats.nalgoo.com/',
): Promise<JobDetailsType> {
	return fetch(`${baseUrl}/jobs/${jobId}`)
		.then((response) => {
			if (!response.ok) {
				throw new Error('Unexpected response');
			}
			return response;
		})
		.then((response) => response.json());
}
