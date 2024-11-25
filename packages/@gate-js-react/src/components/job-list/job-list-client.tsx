'use client';

import { ReactNode, useState } from 'react';
import { getJobList, isConnectionOptions, JobListItemType } from '@gate-js/core';
import { JobListProps } from '../../types/types';
import { JobContextProvider } from '../../context/job-context';
import { useConditionalDidUpdateEffect } from '../../hooks/useConditionalDidUpdateEffect';
import { useOptionsContext } from '../../hooks/useOptionsContext';
import { GateOptions } from '../gate-options/gate-options';
import { Alert } from '../alert/Alert';

export type JobListClientProps = JobListProps & {
	preRenderedContent?: ReactNode,
};

function JobListClientFn({
	options: optionsFromProps,
	renderItem,
	preRenderedContent,
	renderError,
}: JobListClientProps) {
	const [items, setItems] = useState<Array<JobListItemType> | null>(null);
	const [error, setError] = useState<boolean>(false);

	const options = useOptionsContext(optionsFromProps);

	if (!isConnectionOptions(options)) {
		throw new Error('Missing configuration, supply it either via `options` prop or by wrapping in <GateOptions />');
	}

	useConditionalDidUpdateEffect(() => {
		getJobList(options)
			.then(setItems)
			.catch(() => setError(true));
	}, preRenderedContent === undefined, [options]);

	if (error) {
		const Error = renderError || Alert;
		return (
			<Error options={options} />
		);
	}

	const Item = renderItem;
	let index = 0;

	return (
		<GateOptions options={options}>
			{items ? (
				items.map((item: JobListItemType) => {
					index += 1;

					return (
						<JobContextProvider jobId={item.id} key={item.id}>
							<Item item={item} index={index} />
						</JobContextProvider>
					);
				})
			) : (
				preRenderedContent || 'loading'
			)}
		</GateOptions>
	);
}

JobListClientFn.displayName = 'JobList';

export { JobListClientFn as JobListClient };
