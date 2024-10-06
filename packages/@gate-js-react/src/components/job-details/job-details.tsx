import { isServer } from '../../utils/isServer';
import { JobDetailsProps } from '../../types/types';
import { JobDetailsClient } from './job-details-client';
import { JobDetailsServer } from './job-details-server';

export function JobDetails({
	jobId,
	options,
	renderDetails,
	renderError = undefined,
}: JobDetailsProps) {
	return (
		<JobDetailsClient
			options={options}
			jobId={jobId}
			renderDetails={renderDetails}
			renderError={renderError}
			preRenderedContent={
				isServer()
					? (
						// @ts-expect-error Dunno why, should be okay in newer React
						<JobDetailsServer
							jobId={jobId}
							options={options}
							renderDetails={renderDetails}
							renderError={renderError}
						/>
					) : undefined
			}
		/>
	);
}
