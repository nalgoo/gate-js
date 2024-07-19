'use server';

import { GateConfigType, getJobList, JobListItemType } from '@gate-js/core';
import { JobContextProvider } from '../../context/job-context';
import { JobListProps } from '../../types/types';

export type JobListServerProps = JobListProps & {
	config: GateConfigType,
};

export async function JobListServer({
	config,
	renderItem,
}: JobListServerProps) {
	if (!config) {
		throw new Error('Missing configuration');
	}

	const items = await getJobList(config.baseUrl);

	let index = 0;

	const Item = renderItem;

	return (
		<>
			{(
				items.map((item: JobListItemType) => {
					index += 1;
					return (
						<JobContextProvider jobId={item.id} config={config} key={item.id}>
							<Item item={item} index={index} />
						</JobContextProvider>
					);
				})
			)}
		</>
	);
}
