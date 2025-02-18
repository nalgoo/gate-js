import { JobListItemType } from './jobs';

export type FilterFnType = (item: JobListItemType) => boolean;

export type FilterType = {
	language?: string | string[],

	location?: string | string[],

	custom?: Record<string, string | string[]>,
} | FilterFnType;
