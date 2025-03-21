'use client';

import sanitizeHtml from 'sanitize-html';
import { ElementType, Ref, useMemo } from 'react';
import { NativeElementProps } from '../../types/types';
import { forwardRefWithAs, render } from '../../utils/render';

const DEFAULT_TAG = 'div' as const;

// allow style attribute on every tag
const sanitizeSettings = {
	allowedAttributes: {
		...sanitizeHtml.defaults.allowedAttributes,
		'*': ['style'],
	},
};

function JobContentFn<TTag extends ElementType = typeof DEFAULT_TAG>({
	children: childrenProp,
	...theirProps
}: NativeElementProps<TTag>, ref: Ref<HTMLElement>) {
	const [children, dangerouslySetInnerHTML] = useMemo(
		() => (typeof childrenProp === 'string'
			? [undefined, { __html: sanitizeHtml(childrenProp, sanitizeSettings) }]
			: [childrenProp, undefined]),
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

JobContentFn.displayName = 'JobContent';

export const JobContent = forwardRefWithAs(JobContentFn);
