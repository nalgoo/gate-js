import {
	FilterOptionsType,
	FilterType,
	JobListItemType,
	RequestOptionsType,
} from '../types';
import { getBaseUrl } from '../utils/get-base-url';

function filterField(value: string | null, valueToCheck: string | string [] | undefined): boolean {
	// everything should match even if empty array supplied
	if (!valueToCheck || (Array.isArray(valueToCheck) && valueToCheck.length === 0)) {
		return true;
	}

	if (value === null) {
		return false;
	}

	const normalizedValue = Array.isArray(valueToCheck) ? valueToCheck : [valueToCheck];

	return normalizedValue.includes(value);
}

function filterJobs(jobs: JobListItemType[], filter: FilterType | undefined): JobListItemType[] {
	if (!filter) {
		return jobs;
	}

	return jobs.filter((job) => {
		if (!filterField(job.language, filter.language)) {
			return false;
		}

		if (!filterField(job.location, filter.location)) {
			return false;
		}

		return true;
	});
}

export async function getJobList(options: RequestOptionsType & FilterOptionsType): Promise<Array<JobListItemType>> {
	const requestInit: RequestInit = options.abortSignal ? { signal: options.abortSignal } : {};

	return fetch(`${getBaseUrl(options)}/jobs`, requestInit)
		.then((response) => response.json())
		.then((jobs) => filterJobs(jobs, options.filter));
}
