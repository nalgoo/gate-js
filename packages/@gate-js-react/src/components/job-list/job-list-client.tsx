'use client';

import { ReactNode, useState } from 'react';
import { getJobList, isConnectionOptions, JobListItemType } from '@gate-js/core';
import { JobListProps } from '../../types/types';
import { JobContextProvider } from '../../context/job-context';
import { useConditionalDidUpdateEffect } from '../../hooks/useConditionalDidUpdateEffect';
import { useOptionsContext } from '../../hooks/useOptionsContext';
import { GateOptions } from '../gate-options/gate-options';

export type JobListClientProps = JobListProps & {
	preRenderedContent?: ReactNode,
};

export function JobListClient({
	options: optionsFromProps,
	renderItem,
	preRenderedContent,
}: JobListClientProps) {
	const [items, setItems] = useState<Array<JobListItemType> | null>(null);

	const options = useOptionsContext(optionsFromProps);

	if (!isConnectionOptions(options)) {
		throw new Error('Missing configuration, supply it either via `options` prop or by wrapping in <GateOptions />');
	}

	useConditionalDidUpdateEffect(() => {
		getJobList(options)
			.then(setItems);
	}, preRenderedContent === undefined, [options]);

	if (items === null) {
		return preRenderedContent || 'loading';
	}

	const Item = renderItem;
	let index = 0;

	return (
		<GateOptions options={options}>
			{items.map((item: JobListItemType) => {
				index += 1;

				return (
					<JobContextProvider jobId={item.id} key={item.id}>
						<Item item={item} index={index} />
					</JobContextProvider>
				);
			})}
		</GateOptions>
	);
}
