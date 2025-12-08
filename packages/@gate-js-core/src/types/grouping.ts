import type { JobListItemType } from './jobs';

export type GroupIndexType = string | number | null;

export type GroupByFnType = (job: JobListItemType) => GroupIndexType[];

export type GroupByType = GroupByFnType | string;