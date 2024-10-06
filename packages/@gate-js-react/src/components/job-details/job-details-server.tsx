'use server';

import { getJobDetails, logError } from '@gate-js/core';
import { JobDetailsProps } from '../../types/types';
import { JobContextProvider } from '../../context/job-context';
import { Alert } from '../alert/Alert';

export async function JobDetailsServer({
	options,
	jobId,
	renderDetails,
	renderError,
}: JobDetailsProps) {
	try {
		const job = await getJobDetails(jobId, options);

		const Details = renderDetails;

		return (
			<JobContextProvider jobId={jobId} options={options}>
				<Details job={job} />
			</JobContextProvider>
		);
	} catch (e) {
		logError(e);

		const Error = renderError || Alert;
		return (
			<JobContextProvider jobId={jobId} options={options}>
				<Error />
			</JobContextProvider>
		);
	}
}
