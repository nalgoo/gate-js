'use server';

import { getJobList, isConnectionOptions, JobListItemType } from '@gate-js/core';
import { JobContextProvider } from '../../context/job-context';
import { JobListProps } from '../../types/types';

async function JobListServerFn({
	options,
	renderItem,
}: JobListProps) {
	if (!isConnectionOptions(options)) {
		throw new Error('Missing configuration, supply it via `options` prop');
	}

	const items = await getJobList(options);

	let index = 0;

	const Item = renderItem;

	return items.map((item: JobListItemType) => {
		index += 1;
		return (
			<JobContextProvider jobId={item.id} key={item.id}>
				<Item item={item} index={index} />
			</JobContextProvider>
		);
	});
}

JobListServerFn.displayName = 'JobListServer';

export { JobListServerFn as JobListServer };
