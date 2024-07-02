import { isServer } from '../../utils/isServer.ts';
import { JobDetailsProps } from '../../types/types.ts';
import { JobDetailsServer } from './job-details-server.tsx';
import { JobDetailsClient } from './job-details-client.tsx';

export function JobDetails(props: JobDetailsProps) {
	return isServer()
		? <JobDetailsServer {...props} />
		: <JobDetailsClient {...props} />;
}
