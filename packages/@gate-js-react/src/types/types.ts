import { ElementType, ReactNode } from 'react';
import {
	ApplyOptionsType,
	JobDetailsType,
	JobListItemType,
	OptionsType,
} from '@gate-js/core';
import { Props } from '../utils/types';
import { GateContextType } from '../context/gate-context';

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
	options: OptionsType,

	renderItem: RenderItemType,
};

export type JobDetailsProps = {
	options: OptionsType,

	renderDetails: RenderDetailsType,

	jobId: number,

	renderError?: RenderErrorType;
};

export type GateProps = {
	options: OptionsType,

	children: ReactNode | ((props: GateContextType) => ReactNode),

	initialJobId?: number,

	applyOptions?: ApplyOptionsType,
};

export type NativeElementProps<TTag extends ElementType> = Props<TTag>;
