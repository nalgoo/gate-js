'use server';

import { getJobList, isConnectionOptions, JobListItemType, logError } from '@gate-js/core';
import { Alert } from '../alert/Alert';
import { JobContextProvider } from '../../context/job-context';
import { JobListProps } from '../../types/types';

async function JobListServerFn({
	options,
	renderItem,
	renderError,
}: JobListProps) {
	if (!isConnectionOptions(options)) {
		throw new Error('Missing configuration, supply it via `options` prop');
	}

	try {
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
	} catch (e) {
		logError(e);

		const ErrorCmp = renderError || Alert;

		return (
			<ErrorCmp options={options} />
		);
	}
}

JobListServerFn.displayName = 'JobListServer';

export { JobListServerFn as JobListServer };
