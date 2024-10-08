'use client';

import { ReactNode, useEffect, useState } from 'react';
import {
	getJobDetails,
	isConnectionOptions,
	JobDetailsType,
	trackJobView,
} from '@gate-js/core';
import { JobDetailsProps } from '../../types/types';
import { JobContextProvider } from '../../context/job-context';
import { useConditionalDidUpdateEffect } from '../../hooks/useConditionalDidUpdateEffect';
import { useOptionsContext } from '../../hooks/useOptionsContext';
import { GateOptions } from '../gate-options/gate-options';
import { Alert } from '../alert/Alert';

export type JobDetailsClientProps = JobDetailsProps & {
	preRenderedContent?: ReactNode,
};

export function JobDetailsClient({
	jobId,
	options: optionsFromProps,
	renderDetails,
	renderError,
	preRenderedContent,
}: JobDetailsClientProps) {
	const [job, setJob] = useState<JobDetailsType | null>(null);
	const [error, setError] = useState<boolean>(false);

	const options = useOptionsContext(optionsFromProps);

	if (!isConnectionOptions(options)) {
		throw new Error('Missing configuration, supply it either via `options` prop or by wrapping in <GateOptions />');
	}

	useConditionalDidUpdateEffect(() => {
		getJobDetails(jobId, options)
			.then(setJob)
			.catch(() => setError(true));
	}, preRenderedContent === undefined, [options, jobId]);

	useEffect(() => {
		const { baseUrl, organization } = { ...{ baseUrl: '', organization: '' }, ...options };
		const key = `nalgoo::job-view::${baseUrl}::${organization}::${jobId}`;
		const isCached = sessionStorage.getItem(key);
		if (!isCached) {
			trackJobView(jobId, options);
			sessionStorage.setItem(key, '1');
		}
	}, [jobId, options]);

	if (job === null && !error) {
		return preRenderedContent || 'loading';
	}

	if (error) {
		const Error = renderError || Alert;
		return (
			<Error jobId={jobId} options={options} />
		);
	}

	const Details = renderDetails;

	return (
		<GateOptions options={options}>
			<JobContextProvider jobId={jobId}>
				{job && <Details job={job} />}
			</JobContextProvider>
		</GateOptions>
	);
}
