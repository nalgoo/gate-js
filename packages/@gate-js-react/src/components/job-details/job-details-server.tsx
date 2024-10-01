'use server';

import { getJobDetails } from '@gate-js/core';
import { JobDetailsProps } from '../../types/types';
import { JobContextProvider } from '../../context/job-context';
import { Alert } from '../alert/Alert';

export async function JobDetailsServer({
	config,
	applyOptions,
	jobId,
	renderDetails,
	renderError,
}: JobDetailsProps) {
	try {
		const job = await getJobDetails(jobId, config);

		const Details = renderDetails;

		return (
			<JobContextProvider jobId={jobId} config={config} applyOptions={applyOptions}>
				<Details job={job} />
			</JobContextProvider>
		);
	} catch (e) {
		console.error(e);

		const Error = renderError || Alert;
		return (
			<JobContextProvider jobId={jobId} config={config} applyOptions={applyOptions}>
				<Error />
			</JobContextProvider>
		);
	}
}
