'use client';

import { ReactNode } from 'react';
import { JobListItemType } from '@gate-js/core';
import { JobListBaseProps } from '../../types/types';
import { JobContextProvider } from '../../context/job-context';
import { useJobs } from '../../hooks/use-jobs';

type JobListClientProps = JobListBaseProps & {
	preRenderedContent?: ReactNode,
};

function JobListClientFn({
	renderItem,
	preRenderedContent,
}: JobListClientProps) {
	const { jobs, limit } = useJobs();

	const Item = renderItem;
	let index = 0;

	return (
		jobs ? (
			jobs.slice(0, limit).map((item: JobListItemType) => {
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
