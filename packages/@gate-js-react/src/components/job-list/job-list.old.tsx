import { isServer } from '../../utils/isServer.ts';
import { JobListServer } from './job-list-server.tsx';
import { JobListProps } from '../../types/types.ts';
import { JobListClient } from './job-list-client.tsx';
import { useJob } from '../../context/job-context.tsx';

export function JobList(props: JobListProps) {
	return isServer()
		? <JobListServer {...props} />
		: <JobListClient {...props} />;
}
