import { ElementType, Ref } from 'react';
import { JobListClient } from './job-list-client';
import { JobListServer } from './job-list-server';
import { isServer } from '../../utils/isServer';
import { JobListBaseProps, NativeElementProps } from '../../types/types';
import { forwardRefWithAs, render } from '../../utils/render';

const DEFAULT_TAG = 'ul' as const;

export type JobListProps<T extends ElementType> =
	NativeElementProps<T>
	& JobListBaseProps;

function JobListFn<TTag extends ElementType = typeof DEFAULT_TAG>({
	renderItem,
	...theirProps
}: JobListProps<TTag>, ref: Ref<HTMLElement>) {
	const children = (
		<JobListClient
			renderItem={renderItem}
			preRenderedContent={
				isServer()
					// @ts-expect-error Dunno why, should be okay in newer React
					? <JobListServer renderItem={renderItem} />
					: undefined
			}
		/>
	);

	const ourProps = {
		ref,
		children,
	};

	return render({
		ourProps,
		theirProps,
		slot: {}, // slot,
		defaultTag: DEFAULT_TAG,
		name: 'JobList',
	});
}

JobListFn.displayName = 'JobList';

export const JobList = forwardRefWithAs(JobListFn);
