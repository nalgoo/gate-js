import { JobDetailsType } from '../types/job-details-type';

export async function getJobDetails(
	jobId: number,
	baseUrl = 'https://ats.nalgoo.com/',
): Promise<JobDetailsType> {
	return fetch(`${baseUrl}/jobs/${jobId}`)
		.then((response) => response.json());
}
