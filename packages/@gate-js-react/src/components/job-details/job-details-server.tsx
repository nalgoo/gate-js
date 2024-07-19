'use server';

import { getJobDetails } from '@gate-js/core';
import { JobDetailsProps } from '../../types/types';
import { JobContextProvider } from '../../context/job-context';
import { Alert } from '../alert/Alert';

export async function JobDetailsServer({
	config,
	jobId,
	renderDetails,
	renderError,
}: JobDetailsProps) {
	try {
		const job = await getJobDetails(jobId, config.baseUrl);

		const Details = renderDetails;

		return (
			<JobContextProvider jobId={jobId} config={config}>
				<Details job={job} />
			</JobContextProvider>
		);
	} catch (e) {
		const Error = renderError || Alert;
		return (
			<JobContextProvider jobId={jobId} config={config}>
				<Error />
			</JobContextProvider>
		);
	}
}
