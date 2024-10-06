'use server';

import { getJobList, JobListItemType } from '@gate-js/core';
import { JobContextProvider } from '../../context/job-context';
import { JobListProps } from '../../types/types';

export async function JobListServer({
	options,
	renderItem,
}: JobListProps) {
	if (!options) {
		throw new Error('Missing configuration');
	}

	const items = await getJobList(options);

	let index = 0;

	const Item = renderItem;

	return (
		<>
			{(
				items.map((item: JobListItemType) => {
					index += 1;
					return (
						<JobContextProvider jobId={item.id} options={options} key={item.id}>
							<Item item={item} index={index} />
						</JobContextProvider>
					);
				})
			)}
		</>
	);
}
