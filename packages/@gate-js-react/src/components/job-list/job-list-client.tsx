'use client';

import { ReactNode } from 'react';
import { JobListBaseProps } from '../../types/types';
import { JobContextProvider } from '../../context/job-context';
import { useJobs } from '../../hooks/use-jobs';
import { matchGroup } from '@gate-js/core';

type JobListClientProps = JobListBaseProps & {
	preRenderedContent?: ReactNode,
};

function JobListClientFn({
	renderItem,
	preRenderedContent,
    group,
}: JobListClientProps) {
	const { jobs, limit } = useJobs();

	const Item = renderItem;
	let index = 0;

	return (
		jobs ? (
			jobs.filter((job) => matchGroup(job, group))
            .slice(0, limit)
            .map((item) => {
				index += 1;

				return (
					<JobContextProvider jobId={item.id} key={item.id}>
						<Item item={item} index={index} />
					</JobContextProvider>
				);
			})
		) : (
			preRenderedContent || 'loading'
		)
	);
}

JobListClientFn.displayName = 'JobListClient';

export { JobListClientFn as JobListClient };
