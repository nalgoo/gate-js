'use client';

import {
	ElementType,
	Ref,
	useState,
} from 'react';
import { ApplyOptionsType } from '@gate-js/core';
import { ErrorBoundary } from 'react-error-boundary';
import { forwardRefWithAs, render } from '../../utils/render';
import { NativeElementProps } from '../../types/types';
import { DrawerClientPortal } from './components/drawer-client-portal';

const DEFAULT_TAG = 'button' as const;

export type ApplyButtonProps<T extends ElementType> = NativeElementProps<T> & {
	options?: ApplyOptionsType,

	global?: boolean,
};

function ApplyButtonFn<TTag extends ElementType = typeof DEFAULT_TAG>({
	options,
	global = false,
	...theirProps
}: ApplyButtonProps<TTag>, ref: Ref<HTMLElement>) {
	const [open, setOpen] = useState(false);

	const ourProps = {
		ref,
		// eslint-disable-next-line no-console
		onClick: () => setOpen(true),
	};

	return (
		<ErrorBoundary
			fallback={(
				<span title="There was an error while rendering apply button, check your console to view details">
					⚠️
				</span>
			)}
		>
			{
				render({
					ourProps,
					theirProps,
					slot: {}, // slot,
					defaultTag: DEFAULT_TAG,
					name: 'ApplyButton',
				})
			}
			<DrawerClientPortal open={open} setOpen={setOpen} options={options} global={global} />
		</ErrorBoundary>
	);
}

ApplyButtonFn.displayName = 'ApplyButton';

export const ApplyButton = forwardRefWithAs(ApplyButtonFn);
