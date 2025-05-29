import {
	FilterOptionsType,
	FilterType,
	JobListItemType,
	RequestOptionsType, SortingOptionsType,
} from '../types';
import { getBaseUrl } from '../utils/get-base-url';

/**
 * Returns `true` if value matches
 */
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

	if (typeof filter === 'function') {
		return jobs.filter(filter);
	}

	return jobs.filter((job) => {
		if (!filterField(job.language, filter.language)) {
			return false;
		}

		if (!filterField(job.location, filter.location)) {
			return false;
		}

		if (filter.custom) {
			return Object.entries(filter.custom)
				.every(
					// eslint-disable-next-line max-len
					([k, v]: [string, string | string[]]) => filterField(typeof job.fields[k] === 'string' ? job.fields[k] : job.fields[k]?.label, v),
				);
		}

		return true;
	});
}

function sortJobs(jobs: Array<JobListItemType>, options: SortingOptionsType): Array<JobListItemType> {
	const sortWith = (jobA: JobListItemType, jobB: JobListItemType): number => {
		const sortValue = (a: string | Date, b: string | Date) => {
			if (a < b) {
				return -1;
			}

			if (a > b) {
				return 1;
			}

			return 0;
		};

		if (options.orderBy === 'updatedOn') {
			// order of items is reversed, because we want to order DESC by default
			return sortValue(jobB.updatedOn, jobA.updatedOn);
		}
		if (options.orderBy === 'publishedOn') {
			// order of items is reversed, because we want to order DESC by default
			return sortValue(jobB.publishedOn, jobA.publishedOn);
		}

		// default sortBy title
		return sortValue(jobA.title, jobB.title);
	};

	const sortedJobs = jobs.toSorted(options.sortingFn || sortWith);

	return options.invertSorting ? sortedJobs.toReversed() : sortedJobs;
}

export async function getJobList(
	options: RequestOptionsType & FilterOptionsType & SortingOptionsType,
): Promise<Array<JobListItemType>> {
	const requestInit: RequestInit = options.abortSignal ? { signal: options.abortSignal } : {};

	return fetch(`${getBaseUrl(options)}/jobs`, requestInit)
		.then((response) => response.json())
		.then((jobs) => filterJobs(jobs, options.filter))
		.then((jobs) => sortJobs(jobs, options));
}
