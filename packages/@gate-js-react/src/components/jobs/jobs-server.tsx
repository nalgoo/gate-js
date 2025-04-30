'use server';

import { getJobList, isConnectionOptions, logError } from '@gate-js/core';
import { Alert } from '../alert/Alert';
import { JobsProps } from '../../types/types';
import { setServerContext } from './jobs-server-context';
import { JobsClientContextProviderForServer } from './jobs-client-context';

async function JobsServerFn({
	options,
	initialLimit,
	renderError,
	children,
}: JobsProps) {
	if (!isConnectionOptions(options)) {
		throw new Error('Missing configuration, supply it via `options` prop');
	}

	try {
		const items = await getJobList(options);
		const ctx = { jobs: items, limit: initialLimit };

		setServerContext(ctx);

		return (
			<JobsClientContextProviderForServer value={ctx}>
				{children}
			</JobsClientContextProviderForServer>
		);
	} catch (e) {
		logError(e);

		const ErrorCmp = renderError || Alert;

		return (
			<ErrorCmp options={options} />
		);
	}
}

JobsServerFn.displayName = 'JobsServer';

export { JobsServerFn as JobsServer };
