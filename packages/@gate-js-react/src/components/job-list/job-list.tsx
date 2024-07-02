import { JobListClient } from './job-list-client.tsx';
import { JobListServer } from './job-list-server.tsx';
import { isServer } from '../../utils/isServer.ts';
import { JobListProps } from '../../types/types.ts';

export function JobList({ config, renderItem }: JobListProps) {
	console.log(isServer());

	return (
		<JobListClient
			config={config}
			renderItem={renderItem}
			preRenderedList={
				isServer()
					// @ts-ignore Dunno why, should be okay in newer React
					? <JobListServer config={config} renderItem={renderItem} />
					: undefined
			}
		/>
	);
}
