'use server';

import { getJobDetails, isConnectionOptions, logError } from '@gate-js/core';
import { JobDetailsProps } from '../../types/types';
import { JobContextProvider } from '../../context/job-context';
import { Alert } from '../alert/Alert';
import { GateOptions } from '../gate-options/gate-options';

export async function JobDetailsServer({
	options,
	jobId,
	renderDetails,
	renderError,
}: JobDetailsProps) {
	if (!isConnectionOptions(options)) {
		throw new Error('Missing configuration, supply it via `options` prop');
	}

	try {
		const job = await getJobDetails(jobId, options);

		const Details = renderDetails;

		return (
			<GateOptions options={options}>
				<JobContextProvider jobId={jobId}>
					<Details job={job} />
				</JobContextProvider>
			</GateOptions>
		);
	} catch (e) {
		logError(e);

		const Error = renderError || Alert;
		return (
			<Error jobId={jobId} options={options} />
		);
	}
}
