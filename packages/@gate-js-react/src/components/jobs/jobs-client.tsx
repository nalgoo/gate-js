'use client';

import { ReactNode, useMemo, useState } from 'react';
import { getFields, getJobList, isConnectionOptions, type FilterType, type GroupIndexType, type JobListItemWithGroupType } from '@gate-js/core';
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

    const [filter, setFilter] = useState<FilterType>(options?.filter || {});

	const [items, setItems] = useState<Array<JobListItemWithGroupType> | null>(null);
	const [groups, setGroups] = useState<Set<GroupIndexType>>(new Set());
    
    const [error, setError] = useState<boolean>(false);
	const [loading, setLoading] = useState<boolean>(false);
	const [limit, setLimit] = useState<undefined | number>(initialLimit);

	if (!isConnectionOptions(options)) {
		throw new Error('Missing configuration, supply it either via `options` prop or by wrapping in <GateOptions />');
	}

	useConditionalDidUpdateEffect(() => {
		setLoading(true);

		getJobList({ ...options, filter })
			.then(setItems)
			.then(() => setLoading(false))
			.catch(() => setError(true));

        if (options.groupBy && typeof options.groupBy === 'string') {
            getFields(options)
                .then((fieldsMap) => fieldsMap.get(options.groupBy as string))
                .then((field) => {
                    if (field && field.type === 'select') {
                        return field.options;
                    }
                    return new Set<GroupIndexType>();
                })
                .then((groups) => setGroups(groups));
        }
	}, preRenderedContent === undefined, [options, filter, limit]);

	const value = useMemo(() => ({
        jobs: items,
        loading,
        limit,
        setLimit,
        filter,
        setFilter,
        groups,
    }), [items, loading, limit, setLimit, filter, setFilter, groups]);

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
