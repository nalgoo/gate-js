'use server';

import { JobListItemType } from '@gate-js/core';
import { JobContextProvider } from '../../context/job-context';
import { getServerContext } from '../jobs/jobs-server-context';
import { JobListBaseProps } from '../../types/types';

async function JobListServerFn({
	renderItem,
}: JobListBaseProps) {
	const { jobs, limit } = await getServerContext();

	let index = 0;

	const Item = renderItem;

	return jobs.slice(0, limit).map((item: JobListItemType) => {
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
