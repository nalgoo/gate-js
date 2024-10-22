import { JobListClient } from './job-list-client';
import { JobListServer } from './job-list-server';
import { isServer } from '../../utils/isServer';
import { JobListProps } from '../../types/types';

function JobListFn({ options, renderItem }: JobListProps) {
	return (
		<JobListClient
			options={options}
			renderItem={renderItem}
			preRenderedContent={
				isServer()
					// @ts-expect-error Dunno why, should be okay in newer React
					? <JobListServer options={options} renderItem={renderItem} />
					: undefined
			}
		/>
	);
}

JobListFn.displayName = 'JobList';

export { JobListFn as JobList };
