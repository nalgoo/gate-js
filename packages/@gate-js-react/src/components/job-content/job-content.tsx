'use client';

import sanitizeHtml from 'sanitize-html';
import { ElementType, Ref, useMemo } from 'react';
import { NativeElementProps } from '../../types/types.ts';
import { forwardRefWithAs, render } from '../utils/render.ts';

const DEFAULT_TAG = 'div' as const;

function JobContentFn<TTag extends ElementType = typeof DEFAULT_TAG>({
	children: childrenProp,
	...theirProps
}: NativeElementProps<TTag>, ref: Ref<HTMLElement>) {
	const [children, dangerouslySetInnerHTML] = useMemo(
		() => typeof childrenProp === 'string'
			? [undefined, { __html: sanitizeHtml(childrenProp) }]
			: [childrenProp, undefined],
		[childrenProp],
	);

	const ourProps = {
		ref,
		children,
		dangerouslySetInnerHTML,
	};

	return render({
		ourProps,
		theirProps,
		slot: {}, // slot,
		defaultTag: DEFAULT_TAG,
		name: 'JobContent',
	});
}

export const JobContent = forwardRefWithAs(JobContentFn);
