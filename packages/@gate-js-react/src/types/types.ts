import { ElementType, ReactNode } from 'react';
import {
	JobDetailsType,
	OptionsType,
    type FilterType,
    type JobListItemWithGroupType,
} from '@gate-js/core';
import { Props } from '../utils/types';
import type { GroupIndexType } from '@gate-js/core/dist/types/grouping';

export type RenderItemProps = {
	item: JobListItemWithGroupType,

	index: number,
};

export type RenderItemType = ElementType<RenderItemProps>;

export type RenderGroupProps = {
	value: GroupIndexType | undefined,

	index: number,
};

export type RenderGroupType = ElementType<RenderGroupProps>;

export type RenderDetailsProps = {
	job: JobDetailsType,
};

export type RenderDetailsType = ElementType<RenderDetailsProps>;

export type RenderErrorProps = {
	jobId?: number,

	type?: string,

	options?: OptionsType,
};

export type RenderErrorType = ElementType<RenderErrorProps>;

export type JobListBaseProps = {
	options?: OptionsType,

	renderItem: RenderItemType,

    group?: GroupIndexType;
};

export type JobDetailsProps = {
	options?: OptionsType,

	renderDetails: RenderDetailsType,

	jobId: number,

	renderError?: RenderErrorType;
};

export type JobGroupsBaseProps = {
    renderGroup: RenderGroupType;

    showEmptyGroups?: boolean;

    sortAlphabetically?: boolean;
}

export type JobsProps = {
	children: ReactNode;

	renderError?: RenderErrorType;

	options?: OptionsType;

	initialLimit?: number;
};

export type JobsContextProps = {
	jobs: null | Array<JobListItemWithGroupType>;

    groups: Set<GroupIndexType>;

	loading: boolean;
	
    limit: undefined | number;

	setLimit: {
        (limit?: number): void;
        (updater: (prev: number | undefined) => number | undefined): void;
    }

    filter: undefined | FilterType;

    setFilter: {
        (filter: FilterType): void;
        (updater: (prev: FilterType) => FilterType): void;
    }    
};

export type ShowMoreButtonProps<T extends ElementType> = NativeElementProps<T> & {
	step?: number;

	children: ReactNode;
};

export type NativeElementProps<TTag extends ElementType> = Props<TTag>;
