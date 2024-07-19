import { JobListItemType } from '../types/types';

export async function getJobList(baseUrl = 'https://ats.nalgoo.com/'): Promise<Array<JobListItemType>> {
	return fetch(`${baseUrl}/jobs`)
		.then((response) => response.json());
}
