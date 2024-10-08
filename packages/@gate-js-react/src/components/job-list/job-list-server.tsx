'use server';

import { getJobList, isConnectionOptions, JobListItemType } from '@gate-js/core';
import { JobContextProvider } from '../../context/job-context';
import { JobListProps } from '../../types/types';
import { GateOptions } from '../gate-options/gate-options';

export async function JobListServer({
	options,
	renderItem,
}: JobListProps) {
	if (!isConnectionOptions(options)) {
		throw new Error('Missing configuration, supply it via `options` prop');
	}

	const items = await getJobList(options);

	let index = 0;

	const Item = renderItem;

	return (
		<GateOptions options={options}>
			{(
				items.map((item: JobListItemType) => {
					index += 1;
					return (
						<JobContextProvider jobId={item.id} key={item.id}>
							<Item item={item} index={index} />
						</JobContextProvider>
					);
				})
			)}
		</GateOptions>
	);
}
