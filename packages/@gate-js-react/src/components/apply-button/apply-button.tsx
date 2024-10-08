'use client';

import {
	ElementType,
	Ref,
	useEffect,
	useMemo,
	useRef,
	useState,
} from 'react';
import { createPortal } from 'react-dom';
import { createRoot, Root } from 'react-dom/client';
import { IntlProvider } from 'react-intl';
import { ApplyOptionsType, isConnectionOptions, TrackingOptionsType } from '@gate-js/core';
import { forwardRefWithAs, render } from '../../utils/render';
import { NativeElementProps } from '../../types/types';
import { translations } from '../../localization/translations';
import { Drawer } from './components/drawer';
import { ApplyContextProvider } from '../../context/apply-context';
import { useOptionsContext } from '../../hooks/useOptionsContext';
import { useJobContext } from '../../hooks/useJobContext';

// styles:
import '@shoelace-style/shoelace/dist/themes/light.css';
import '@shoelace-style/shoelace/dist/themes/dark.css';
import { Styles } from './components/styles';

const DEFAULT_TAG = 'button' as const;

export type ApplyButtonProps<T extends ElementType> = NativeElementProps<T> & {
	preload?: boolean,

	options?: ApplyOptionsType,

	global?: boolean,
};

const DEFAULTS: Required<ApplyOptionsType> & Required<TrackingOptionsType> = {
	language: 'sk',

	darkTheme: false,

	source: 'gate',

	addons: [],

	origin: null,

	refId: null,
};

function ApplyButtonFn<TTag extends ElementType = typeof DEFAULT_TAG>({
	// todo: redesign preloading
	preload = false,
	options: optionsFromProps = {},
	global = false,
	...theirProps
}: ApplyButtonProps<TTag>, ref: Ref<HTMLElement>) {
	const [open, setOpen] = useState(false);

	const containerRef = useRef<HTMLDivElement>(null);
	const rootRef = useRef<Root | null>(null);
	const drawerRef = useRef(null);
	const isMounted = useRef(false);

	const jobId = useJobContext();

	if (!global && !jobId) {
		throw new Error('Missing `jobId`,'
			+ ' either use `global` prop or supply `jobId` by wrapping in <JobDetails /> or <JobList />');
	}

	const optionsFromHook = useOptionsContext(optionsFromProps);

	const options = useMemo(() => (
		{ ...DEFAULTS, ...optionsFromHook }
	), [optionsFromHook]);

	if (!isConnectionOptions(options)) {
		throw new Error('Missing configuration, supply it either via `options` prop or by wrapping in <GateOptions />');
	}

	const { language, darkTheme } = options;

	const ourProps = {
		ref,
		// eslint-disable-next-line no-console
		onClick: () => setOpen(true),
	};

	useEffect(() => {
		if (!containerRef.current) {
			return undefined;
		}

		isMounted.current = true;

		const shadowRoot = containerRef.current.shadowRoot
			|| containerRef.current.attachShadow({ mode: 'open' });

		shadowRoot.innerHTML = '';

		if (!rootRef.current) {
			rootRef.current = createRoot(shadowRoot, { identifierPrefix: 'gate-js' });
		}

		return () => {
			isMounted.current = false;
			setTimeout(() => {
				if (!isMounted.current) {
					rootRef.current?.unmount();
					rootRef.current = null;
				}
			}, 0);
		};
	}, []);

	useEffect(() => {
		rootRef.current?.render(
			<ApplyContextProvider options={options} jobId={global ? null : jobId}>
				<Styles key="style" />
				<IntlProvider locale={language} messages={translations[language]} fallbackOnEmptyString={false}>
					<Drawer setOpen={setOpen} ref={drawerRef} open={open} />
				</IntlProvider>
			</ApplyContextProvider>,
		);
	}, [setOpen, language, options, jobId, open]);

	return (
		<>
			{
				render({
					ourProps,
					theirProps,
					slot: {}, // slot,
					defaultTag: DEFAULT_TAG,
					name: 'ApplyButton',
				})
			}
			{
				createPortal(
					<div ref={containerRef} className={darkTheme ? 'sl-theme-dark' : ''} />,
					document.body,
				)
			}
		</>
	);
}

export const ApplyButton = forwardRefWithAs(ApplyButtonFn);
