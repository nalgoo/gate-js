import { ElementType } from 'react';
import {
	JobDetailsType,
	JobListItemType,
	OptionsType,
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

export type RenderErrorType = ElementType;

export type JobListProps = {
	options?: OptionsType,

	renderItem: RenderItemType,
};

export type JobDetailsProps = {
	options?: OptionsType,

	renderDetails: RenderDetailsType,

	jobId: number,

	renderError?: RenderErrorType;
};

export type NativeElementProps<TTag extends ElementType> = Props<TTag>;
