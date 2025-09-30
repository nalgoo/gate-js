import {
	FilterOptionsType,
	JobListItemType,
	RequestOptionsType, SortingOptionsType,
} from '../types';
import { getBaseUrl } from '../utils/get-base-url';
import { filterJobs, sortJobs } from './_internal';

export async function getJobList(
	options: RequestOptionsType & FilterOptionsType & SortingOptionsType,
): Promise<Array<JobListItemType>> {
	const requestInit: RequestInit = options.abortSignal ? { signal: options.abortSignal } : {};

	return fetch(`${getBaseUrl(options)}/jobs`, requestInit)
		.then((response) => response.json())
		.then((jobs) => filterJobs(jobs, options.filter))
		.then((jobs) => sortJobs(jobs, options));
}
