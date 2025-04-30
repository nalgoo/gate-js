'use client';

import { ElementType, Ref } from 'react';
import { useJobs } from '../../hooks/use-jobs';
import { ShowMoreButtonProps } from '../../types/types';
import { forwardRefWithAs, render } from '../../utils/render';

const DEFAULT_TAG = 'button' as const;

function ShowMoreButtonFn<TTag extends ElementType = typeof DEFAULT_TAG>({
	step,
	...theirProps
}: ShowMoreButtonProps<TTag>, ref: Ref<HTMLElement>) {
	const { jobs, limit, setLimit } = useJobs();

	if (!jobs || !limit || jobs.length <= limit) {
		return null;
	}

	const ourProps = {
		ref,
		onClick: () => setLimit(step ? limit + step : undefined),
	};

	return render({
		ourProps,
		theirProps,
		slot: {}, // slot,
		defaultTag: DEFAULT_TAG,
		name: 'ShowMoreButton',
	});
}

ShowMoreButtonFn.displayName = 'ShowMoreButton';

export const ShowMoreButton = forwardRefWithAs(ShowMoreButtonFn);
