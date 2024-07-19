import { ElementType, ReactNode } from 'react';
import { GateConfigType, JobDetailsType, JobListItemType } from '@gate-js/core';
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

	renderItem: RenderItemType,
};

export type JobDetailsProps = {
	config: GateConfigType,

	renderDetails: RenderDetailsType,

	jobId: number,

	renderError?: RenderErrorType;
};

export type GateProps = {
	config?: GateConfigType,

	children: ReactNode | ((props: GateContextType) => ReactNode),

	selectedJobId?: number,
};

export type NativeElementProps<TTag extends ElementType> = Props<TTag>;
