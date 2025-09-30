import type { JobListItemType, FilterType, SortingOptionsType } from '../types';

/**
 * Returns `true` if value matches
 */
export function filterField(filedValues: string[], valueToCheck: string | string[] | undefined): boolean {
    // everything should match even if empty array supplied
    if (!valueToCheck || (Array.isArray(valueToCheck) && valueToCheck.length === 0)) {
        return true;
    }

    if (filedValues.length === 0) {
        return false;
    }

    const normalizedValueToCheck = Array.isArray(valueToCheck) ? valueToCheck : [valueToCheck];

    return normalizedValueToCheck.some((v) => filedValues.includes(v));
}

export function normalizeFieldValue(value: undefined | null | string | { label: string; } | Array<{ label: string; }>): string[] {
    if (value === undefined || value === null) {
        return [];
    }

    if (typeof value === 'string') {
        return [value];
    }

    if (Array.isArray(value)) {
        return value.map(v => v.label);
    }

    return [value.label];
}

export function filterJobs(jobs: JobListItemType[], filter: FilterType | undefined): JobListItemType[] {
    if (!filter) {
        return jobs;
    }

    if (typeof filter === 'function') {
        return jobs.filter(filter);
    }

    return jobs.filter((job) => {
        if (!filterField(normalizeFieldValue(job.language), filter.language)) {
            return false;
        }

        if (!filterField(normalizeFieldValue(job.location), filter.location)) {
            return false;
        }

        if (filter.custom) {
            return Object.entries(filter.custom)
                .every(
                    ([k, v]: [string, string | string[]]) => filterField(normalizeFieldValue(job.fields[k]), v)
                );
        }

        return true;
    });
}

export function sortJobs(jobs: Array<JobListItemType>, options: SortingOptionsType): Array<JobListItemType> {
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
