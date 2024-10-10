import { useEffect, useMemo, useRef } from 'react';
import { createRoot, Root } from 'react-dom/client';
import { createPortal } from 'react-dom';
import { IntlProvider } from 'react-intl';
import { ApplyOptionsType, isConnectionOptions, TrackingOptionsType } from '@gate-js/core';
import { ApplyContextProvider } from '../../../context/apply-context';
import { translations } from '../../../localization/translations';
import { Drawer } from './drawer';
import { useJobContext } from '../../../hooks/useJobContext';
import { useOptionsContext } from '../../../hooks/useOptionsContext';

// styles:
import '@shoelace-style/shoelace/dist/themes/light.css';
import '@shoelace-style/shoelace/dist/themes/dark.css';
import { Styles } from './styles';

const DEFAULTS: Required<ApplyOptionsType> & Required<TrackingOptionsType> = {
	language: 'sk',

	darkTheme: false,

	source: 'gate',

	addons: [],

	origin: null,

	refId: null,
};

export function DrawerShadowWrapper({
	open,
	setOpen,
	options: optionsFromProps,
	global,
}) {
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
	}, [setOpen, language, options, jobId, open, global]);

	return createPortal(
		<div ref={containerRef} className={darkTheme ? 'sl-theme-dark' : ''}>
			<style>
				{`
					/*
						disable scrollbar-gutter because it causes design issues in Chromium browsers
						this must be outside of shadow-root
					*/
					@supports (scrollbar-gutter: stable) {
                        .sl-scroll-lock {
                            scrollbar-gutter: auto !important;
		                }
					}
				`}
			</style>
		</div>,
		document.body,
	);
}
