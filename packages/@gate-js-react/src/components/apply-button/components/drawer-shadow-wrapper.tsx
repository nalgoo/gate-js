'use client';

import {
	useEffect,
	useRef,
} from 'react';
import { createRoot, Root } from 'react-dom/client';
import { IntlProvider } from 'react-intl';
import {
	isConnectionOptions,
} from '@gate-js/core';
import { ApplyContextProvider } from '../../../context/apply-context';
import { translations } from '../../../localization/translations';
import { Drawer } from './drawer';
import { useJobContext } from '../../../hooks/use-job-context';

// styles:
import '@shoelace-style/shoelace/dist/themes/light.css';
import '@shoelace-style/shoelace/dist/themes/dark.css';
import { Styles } from './styles';

function DrawerShadowWrapperFn({
	open,
	setOpen,
	options,
	global,
	containerRef,
}) {
	const rootRef = useRef<Root | null>(null);
	const drawerRef = useRef(null);
	const isMounted = useRef(false);

	const { language } = options;

	const jobId = useJobContext();

	if (!global && !jobId) {
		throw new Error('Missing `jobId`,'
			+ ' either use `global` prop or supply `jobId` by wrapping in <JobDetails /> or <JobList />');
	}

	if (!isConnectionOptions(options)) {
		throw new Error('Missing configuration, supply it either via `options` prop or by wrapping in <GateOptions />');
	}

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
	}, [containerRef]);

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

	return null;
}

DrawerShadowWrapperFn.displayName = 'DrawerShadowWrapper';

export { DrawerShadowWrapperFn as DrawerShadowWrapper };
