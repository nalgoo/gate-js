import { ElementType, ReactNode } from 'react';
import {
	JobDetailsType,
	JobListItemType,
	OptionsType,
    type FilterType,
} from '@gate-js/core';
import { Props } from '../utils/types';

export type RenderItemProps = {
	item: JobListItemType,

	index: number,
};

export type RenderItemType = ElementType<RenderItemProps>;

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
};

export type JobDetailsProps = {
	options?: OptionsType,

	renderDetails: RenderDetailsType,

	jobId: number,

	renderError?: RenderErrorType;
};

export type JobsProps = {
	children: ReactNode;

	renderError?: RenderErrorType;

	options?: OptionsType;

	initialLimit?: number;
};

export type JobsContextProps = {
	jobs: null | Array<JobListItemType>;

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
