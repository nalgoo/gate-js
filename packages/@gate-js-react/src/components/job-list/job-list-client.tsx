'use client';

import { ReactNode, useState } from 'react';
import { getJobList, JobListItemType } from '@gate-js/core';
import { JobListProps } from '../../types/types';
import { JobContextProvider } from '../../context/job-context';
import { useConditionalDidUpdateEffect } from '../../hooks/useConditionalDidUpdateEffect';
import { useGateContext } from '../../hooks/useGateContext';

export type JobListClientProps = JobListProps & {
	preRenderedContent?: ReactNode,
};

export function JobListClient({
	options: optionsFromProps,
	renderItem,
	preRenderedContent,
}: JobListClientProps) {
	const [items, setItems] = useState<Array<JobListItemType> | null>(null);

	const { options: optionsFromHook, filter } = useGateContext();

	const options = optionsFromProps ?? optionsFromHook;

	if (!options) {
		throw new Error('Missing configuration, supply it either via `config` prop of wrapping in <Gate />');
	}

	useConditionalDidUpdateEffect(() => {
		getJobList(options)
			.then((arr) => (filter ? arr.filter(({ id }) => id % 2 !== 1) : arr))
			.then(setItems);
	}, preRenderedContent === undefined, [options, filter]);

	if (items === null) {
		return preRenderedContent || 'loading';
	}

	const Item = renderItem;
	let index = 0;

	return items.map((item: JobListItemType) => {
		index += 1;

		return (
			<JobContextProvider jobId={item.id} options={options} key={item.id}>
				<Item item={item} index={index} />
			</JobContextProvider>
		);
	});
}
