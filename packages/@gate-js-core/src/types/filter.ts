import { JobListItemType } from './jobs';

export type FilterFnType = (item: JobListItemType) => boolean;

export type FilteringValueType = string | null | (string|null)[];

export type FilterType = {
	language?: FilteringValueType,

	location?: FilteringValueType,

	custom?: Record<string, FilteringValueType>,
} | FilterFnType;
