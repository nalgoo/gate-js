'use server';

import { JobContextProvider } from '../../context/job-context';
import { getServerContext } from '../jobs/jobs-server-context';
import { JobListBaseProps } from '../../types/types';
import { matchGroup } from '@gate-js/core';

async function JobListServerFn({
	renderItem,
    group,
}: JobListBaseProps) {
	const { jobs, limit } = await getServerContext();

	let index = 0;

	const Item = renderItem;

	return jobs.filter((job) => matchGroup(job, group))
        .slice(0, limit)
        .map((item) => {
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
