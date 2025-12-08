import {
	type FilterOptionsType,
	type RequestOptionsType, 
    type JobListItemWithGroupType,
    type SortingOptionsType,
    type GroupingOptionsType,
} from '../types';
import { getBaseUrl } from '../utils/get-base-url';
import { filterJobs, groupJobs, sortJobs } from './_internal';

export async function getJobList(
	options: RequestOptionsType & FilterOptionsType & SortingOptionsType & GroupingOptionsType,
): Promise<Array<JobListItemWithGroupType>> {
	const requestInit: RequestInit = options.abortSignal ? { signal: options.abortSignal } : {};

	return fetch(`${getBaseUrl(options)}/jobs`, requestInit)
		.then((response) => response.json())
		.then((jobs) => filterJobs(jobs, options.filter, options.filterFn))
		.then((jobs) => sortJobs(jobs, options))
        .then((jobs) => groupJobs(jobs, options.groupBy));
}
