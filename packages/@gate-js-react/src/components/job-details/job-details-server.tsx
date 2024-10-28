'use server';

import {
	getJobDetails,
	isConnectionOptions,
	JobDetailsType,
	JobNotFoundType,
	logError,
} from '@gate-js/core';
import { JobDetailsProps } from '../../types/types';
import { JobContextProvider } from '../../context/job-context';
import { Alert } from '../alert/Alert';

function isNotFound(response: JobDetailsType | JobNotFoundType): response is JobNotFoundType {
	return (response as JobNotFoundType).error === 'not-found';
}

async function JobDetailsServerFn({
	options,
	jobId,
	renderDetails,
	renderError,
}: JobDetailsProps) {
	if (!isConnectionOptions(options)) {
		throw new Error('Missing configuration, supply it via `options` prop');
	}

	const ErrorCmp = renderError || Alert;

	try {
		const response = await getJobDetails(jobId, options);

		if (isNotFound(response)) {
			return (
				<ErrorCmp jobId={response.jobId} type={response.error} />
			);
		}

		const Details = renderDetails;

		return (
			<JobContextProvider jobId={jobId}>
				<Details job={response} />
			</JobContextProvider>
		);
	} catch (e) {
		logError(e);

		return (
			<ErrorCmp jobId={jobId} options={options} />
		);
	}
}

JobDetailsServerFn.displayName = 'JobDetailsServer';

export { JobDetailsServerFn as JobDetailsServer };
