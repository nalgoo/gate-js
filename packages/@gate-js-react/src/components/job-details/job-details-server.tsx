import React from 'react';
import { JobDetailsProps } from '../../types/types.ts';
import { getJobDetails } from '@gate-js/core';
import { JobContextProvider } from '../../context/job-context.tsx';

export async function JobDetailsServer({
	config,
	jobId,
	renderDetails,
}: JobDetailsProps) {
	const job = await getJobDetails(jobId, config.baseUrl);

	const Details = renderDetails;

	return (
		<JobContextProvider jobId={jobId} config={config}>
			<Details job={job} />
		</JobContextProvider>
	);
}
