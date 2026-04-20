'use client';

import {
	ElementType,
	Ref,
	useCallback,
	useMemo,
	useState,
} from 'react';
import { ApplyOptionsType, type TrackingOptionsType } from '@gate-js/core';
import { ErrorBoundary } from 'react-error-boundary';
import { forwardRefWithAs, render } from '../../utils/render';
import { NativeElementProps } from '../../types/types';
import { DrawerClientPortal } from './components/drawer-client-portal';
import { triggerEvent } from '../../utils/events';
import { useOptionsContext } from '../../hooks/use-options-context';
import { useJobContext } from '../../hooks/use-job-context';

const DEFAULT_TAG = 'button' as const;

const DEFAULTS: Required<ApplyOptionsType> & Required<TrackingOptionsType> = {
	language: 'sk',

	darkTheme: false,

	source: 'gate',

	addons: [],

	origin: null,

	refId: null,
};

export type ApplyButtonProps<T extends ElementType> = NativeElementProps<T> & {
	options?: ApplyOptionsType,

	global?: boolean,

	initialOpen?: boolean,
};

function ApplyButtonFn<TTag extends ElementType = typeof DEFAULT_TAG>({
	options: optionsFromProps,
	global = false,
	initialOpen = false,
	...theirProps
}: ApplyButtonProps<TTag>, ref: Ref<HTMLElement>) {
    const optionsFromHook = useOptionsContext(optionsFromProps);

    const jobId = useJobContext();

	const options = useMemo(() => (
		{ ...DEFAULTS, ...optionsFromHook }
	), [optionsFromHook]);
    
	const [open, setOpenState] = useState(initialOpen);

    const setOpen = useCallback((value: boolean) => {
		triggerEvent(value ? 'gate_form_open' : 'gate_form_close', { jobId, refId: options.refId });
		setOpenState(value);
    }, [jobId, options.refId]);

	const ourProps = {
		ref,
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
