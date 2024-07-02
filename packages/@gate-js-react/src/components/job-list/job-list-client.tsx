'use client';

import { useEffect, useRef, useState } from 'react';
import { JobListProps } from '../../types/types.ts';
import { JobContextProvider } from '../../context/job-context.tsx';
import { getJobList, JobListItemType } from '@gate-js/core';
import { useGate } from '../../context/gate-context.tsx';

export type JobListClientProps = JobListProps & {
	preRenderedList?: React.ReactNode
}

export function JobListClient({
	config: configFromProps,
	renderItem,
	preRenderedList,
}: JobListClientProps) {
	const [items, setItems] = useState<Array<JobListItemType>>([]);

	const { config: configFromHook, filter } = useGate();

	const config = configFromProps ?? configFromHook;

	if (!config) {
		throw new Error('Missing configuration, supply it either via `config` prop of wrapping in <Gate />');
	}

	const firstRenderRef = useRef(true);

	useEffect(() => {
		if (preRenderedList === undefined || firstRenderRef.current === false) {
			getJobList(config.baseUrl)
				.then((items) => filter ? items.filter(({id}) => id % 2 !== 1) : items)
				.then(setItems);
		}

		firstRenderRef.current = false;
	}, [config.baseUrl, filter]);

	let index = 0;

	const Item = renderItem;

	return (
		<>
			{(!filter && preRenderedList)
				? preRenderedList
				: (
					items.map((item: JobListItemType) => (
						<JobContextProvider jobId={item.id} config={config} key={item.id}>
							<Item item={item} index={index++} />
						</JobContextProvider>
					))
				)
			}
		</>
	);
}
