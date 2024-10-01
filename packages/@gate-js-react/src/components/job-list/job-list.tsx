import { JobListClient } from './job-list-client';
import { JobListServer } from './job-list-server';
import { isServer } from '../../utils/isServer';
import { JobListProps } from '../../types/types';

export function JobList({ config, applyOptions, renderItem }: JobListProps) {
	return (
		<JobListClient
			config={config}
			applyOptions={applyOptions}
			renderItem={renderItem}
			preRenderedContent={
				isServer()
					// @ts-expect-error Dunno why, should be okay in newer React
					? <JobListServer config={config} applyOptions={applyOptions} renderItem={renderItem} />
					: undefined
			}
		/>
	);
}
