'use client';

import { ReactNode, useEffect, useState } from 'react';
import {
	getJobDetails,
	JobDetailsType,
	OptionsType,
	trackJobView,
} from '@gate-js/core';
import { JobDetailsProps } from '../../types/types';
import { JobContextProvider } from '../../context/job-context';
import { useConditionalDidUpdateEffect } from '../../hooks/useConditionalDidUpdateEffect';
import { useGateContext } from '../../hooks/useGateContext';

export type JobDetailsClientProps = JobDetailsProps & {
	preRenderedContent?: ReactNode,
};

export function JobDetailsClient({
	jobId,
	options: optionsFromProps,
	renderDetails,
	preRenderedContent,
}: JobDetailsClientProps) {
	const [job, setJob] = useState<JobDetailsType | null>(null);
	const [error, setError] = useState<boolean>(false);

	const { options: optionsFromHook } = useGateContext();

	const options: OptionsType = optionsFromProps ?? optionsFromHook;

	if (!options) {
		throw new Error('Missing configuration, supply it either via `config` prop of wrapping in <Gate />');
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
		return 'error';
	}

	const Details = renderDetails;

	return (
		<JobContextProvider jobId={jobId} options={options}>
			{job && <Details job={job} />}
		</JobContextProvider>
	);
}
