import { isServer } from '../../utils/isServer';
import { JobsClient } from './jobs-client';
import { JobsServer } from './jobs-server';
import { JobsProps } from '../../types/types';

function JobsFn({
	options,
	initialLimit,
	renderError,
	children,
}: JobsProps) {
	return (
		<JobsClient
			options={options}
			initialLimit={initialLimit}
			renderError={renderError}
			preRenderedContent={
				isServer()
					? (
						// @ts-expect-error Dunno why, should be okay in newer React
						<JobsServer
							options={options}
							initialLimit={initialLimit}
							renderError={renderError}
						>
							{children}
						</JobsServer>
					)
					: undefined
			}
		>
			{children}
		</JobsClient>
	);
}

JobsFn.displayName = 'Jobs';

export { JobsFn as Jobs };
