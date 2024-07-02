import { ElementType } from 'react';
import { GateConfigType, JobDetailsType, JobListItemType } from '@gate-js/core';
import { Props } from '../components/utils/types.ts';
import { GateContextType } from '../context/gate-context.tsx';

export type RenderItemProps = {
	item: JobListItemType,

	index: number,
}

export type RenderItemType = React.ElementType<RenderItemProps>;

export type RenderDetailsProps = {
	job: JobDetailsType,
}

export type RenderDetailsType = React.ElementType<RenderDetailsProps>;

export type JobListProps = {
	config?: GateConfigType,

	renderItem: RenderItemType,
};

export type JobDetailsProps = {
	config: GateConfigType,

	renderDetails: RenderDetailsType,

	jobId: number,
};

export type GateProps = {
	config?: GateConfigType,

	children: React.ReactNode | ((props: GateContextType) => React.ReactNode),

	selectedJobId?: number,
};

export type NativeElementProps<TTag extends ElementType> = Props<TTag>;
