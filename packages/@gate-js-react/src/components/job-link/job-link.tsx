'use client';

import { ElementType, Ref } from 'react';
import { NativeElementProps } from '../../types/types.ts';
import { render } from '../utils/render.ts';
import { useGate } from '../../context/gate-context.tsx';
import { useJob } from '../../context/job-context.tsx';

const DEFAULT_TAG = 'a' as const;

export function JobLinkFn<TTag extends ElementType = typeof DEFAULT_TAG>({
	...theirProps
}: NativeElementProps<TTag>, ref: Ref<HTMLElement>) {
	const { setSelectedJobId } = useGate();
	const { jobId } = useJob();

	const ourProps = {
		ref,
		onClick: () => setSelectedJobId(jobId),
	};

	return render({
		ourProps,
		theirProps,
		slot: {}, // slot,
		defaultTag: DEFAULT_TAG,
		name: 'JobLink',
	});
}
