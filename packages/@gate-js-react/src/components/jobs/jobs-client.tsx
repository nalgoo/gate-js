'use client';

import { ReactNode, useMemo, useState } from 'react';
import { getJobList, isConnectionOptions, JobListItemType } from '@gate-js/core';
import { useOptionsContext } from '../../hooks/use-options-context';
import { useConditionalDidUpdateEffect } from '../../hooks/use-conditional-did-update-effect';
import { Alert } from '../alert/Alert';
import { JobsClientContext } from './jobs-client-context';
import { GateOptions } from '../gate-options/gate-options';
import { JobsProps } from '../../types/types';

type JobsClientProps = JobsProps & {
	preRenderedContent?: ReactNode,
};

function JobsClientFn({
	options: optionsFromProps,
	initialLimit,
	preRenderedContent,
	renderError,
	children,
}: JobsClientProps) {
	const options = useOptionsContext(optionsFromProps);

	if (!isConnectionOptions(options)) {
		throw new Error('Missing configuration, supply it either via `options` prop or by wrapping in <GateOptions />');
	}

	const [items, setItems] = useState<Array<JobListItemType> | null>(null);
	const [error, setError] = useState<boolean>(false);
	const [loading, setLoading] = useState<boolean>(false);
	const [limit, setLimit] = useState<undefined | number>(initialLimit);

	useConditionalDidUpdateEffect(() => {
		setLoading(true);

		getJobList(options)
			.then(setItems)
			.then(() => setLoading(false))
			.catch(() => setError(true));
	}, preRenderedContent === undefined, [options, limit]);

	const value = useMemo(() => ({
		jobs: items,
		loading,
		limit,
		setLimit,
	}), [items, loading, limit, setLimit]);

	if (error) {
		const Error = renderError || Alert;
		return (
			<Error options={options} />
		);
	}

	return (
		<GateOptions options={options}>
			<JobsClientContext.Provider value={value}>
				{(preRenderedContent && !items) ? preRenderedContent : children}
			</JobsClientContext.Provider>
		</GateOptions>
	);
}

JobsClientFn.displayName = 'JobsClient';

export { JobsClientFn as JobsClient };
