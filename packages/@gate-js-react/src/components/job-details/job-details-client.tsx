'use client';

import { ReactNode, useState } from 'react';
import { getJobDetails, JobDetailsType } from '@gate-js/core';
import { JobDetailsProps } from '../../types/types';
import { JobContextProvider } from '../../context/job-context';
import { useConditionalDidUpdateEffect } from '../../hooks/useConditionalDidUpdateEffect';
import { useGateContext } from '../../hooks/useGateContext';

export type JobDetailsClientProps = JobDetailsProps & {
	preRenderedContent?: ReactNode,
};

export function JobDetailsClient({
	jobId,
	config: configFromProps,
	applyOptions,
	renderDetails,
	preRenderedContent,
}: JobDetailsClientProps) {
	const [job, setJob] = useState<JobDetailsType | null>(null);
	const [error, setError] = useState<boolean>(false);

	const { config: configFromHook } = useGateContext();

	const config = configFromProps ?? configFromHook;

	if (!config) {
		throw new Error('Missing configuration, supply it either via `config` prop of wrapping in <Gate />');
	}

	useConditionalDidUpdateEffect(() => {
		getJobDetails(jobId, config.baseUrl)
			.then(setJob)
			.catch(() => setError(true));
	}, preRenderedContent === undefined, [config.baseUrl, jobId]);

	if (job === null && !error) {
		return preRenderedContent || 'loading';
	}

	if (error) {
		return 'error';
	}

	const Details = renderDetails;

	return (
		<JobContextProvider jobId={jobId} config={config} applyOptions={applyOptions}>
			{job && <Details job={job} />}
		</JobContextProvider>
	);
}
