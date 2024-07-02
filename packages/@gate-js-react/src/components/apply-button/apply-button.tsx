'use client';

import { ElementType, Ref } from 'react';
import { useJob } from '../../context/job-context.tsx';
import { forwardRefWithAs, render } from '../utils/render.ts';
import { NativeElementProps } from '../../types/types.ts';

const DEFAULT_TAG = 'button' as const;

function ApplyButtonFn<TTag extends ElementType = typeof DEFAULT_TAG>({
	...theirProps
}: NativeElementProps<TTag>, ref: Ref<HTMLElement>) {
	const { jobId, baseUrl } = useJob();

	const ourProps = {
		ref,
		onClick: () => alert('apply for position: ' + jobId),
	};

	return render({
		ourProps,
		theirProps,
		slot: {}, // slot,
		defaultTag: DEFAULT_TAG,
		name: 'ApplyButton',
	});
}

export const ApplyButton = forwardRefWithAs(ApplyButtonFn);
