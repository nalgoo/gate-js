import { JobListItemType } from '../types/job-list-item-type';

export async function getJobList(baseUrl = 'https://ats.nalgoo.com/'): Promise<Array<JobListItemType>> {
	return fetch(`${baseUrl}/jobs`)
		.then((response) => response.json());
}
