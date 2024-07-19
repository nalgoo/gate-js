'use client';

import { ElementType, Ref } from 'react';
import { NativeElementProps } from '../../types/types';
import { render } from '../../utils/render';
import { useJobContext } from '../../hooks/useJobContext';
import { useGateContext } from '../../hooks/useGateContext';

const DEFAULT_TAG = 'a' as const;

export function JobLinkFn<TTag extends ElementType = typeof DEFAULT_TAG>({
	...theirProps
}: NativeElementProps<TTag>, ref: Ref<HTMLElement>) {
	const { setSelectedJobId } = useGateContext();
	const { jobId } = useJobContext();

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
