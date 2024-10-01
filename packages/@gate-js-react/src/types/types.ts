import { ElementType, ReactNode } from 'react';
import {
	ApplyOptionsType,
	GateConfigType,
	JobDetailsType,
	JobListItemType,
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
	config?: GateConfigType,

	applyOptions?: ApplyOptionsType,

	renderItem: RenderItemType,
};

export type JobDetailsProps = {
	config: GateConfigType,

	applyOptions?: ApplyOptionsType,

	renderDetails: RenderDetailsType,

	jobId: number,

	renderError?: RenderErrorType;
};

export type GateProps = {
	config?: GateConfigType,

	children: ReactNode | ((props: GateContextType) => ReactNode),

	initialJobId?: number,

	applyOptions?: ApplyOptionsType,
};

export type NativeElementProps<TTag extends ElementType> = Props<TTag>;
