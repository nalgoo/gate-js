'use client';

import { ElementType, Ref } from 'react';
import { forwardRefWithAs, render } from '../../utils/render';
import { NativeElementProps } from '../../types/types';
import { useJobContext } from '../../hooks/useJobContext';

const DEFAULT_TAG = 'button' as const;

function ApplyButtonFn<TTag extends ElementType = typeof DEFAULT_TAG>({
	...theirProps
}: NativeElementProps<TTag>, ref: Ref<HTMLElement>) {
	const { jobId } = useJobContext();

	const ourProps = {
		ref,
		// eslint-disable-next-line no-console
		onClick: () => console.log(`apply for position: ${jobId}`),
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
