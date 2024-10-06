'use client';

import {
	ElementType,
	Ref,
	useEffect,
	useRef,
	useState,
} from 'react';
import { createPortal } from 'react-dom';
import { createRoot, Root } from 'react-dom/client';
import { IntlProvider } from 'react-intl';
import { ApplyOptionsType } from '@gate-js/core';
import { forwardRefWithAs, render } from '../../utils/render';
import { NativeElementProps } from '../../types/types';
import { JobContextProvider } from '../../context/job-context';
import { useJobContext } from '../../hooks/useJobContext';
import { translations } from '../../localization/translations';
import { Drawer } from './components/drawer';

import '@shoelace-style/shoelace/dist/themes/light.css';
import '@shoelace-style/shoelace/dist/themes/dark.css';
import { Styles } from './components/styles';

const DEFAULT_TAG = 'button' as const;

export type ApplyButtonProps<T extends ElementType> = NativeElementProps<T> & {
	preload?: boolean,

	options?: ApplyOptionsType,
};

function ApplyButtonFn<TTag extends ElementType = typeof DEFAULT_TAG>({
	// todo: redesign preloading
	preload = false,
	options: optionsFromProps = {},
	...theirProps
}: ApplyButtonProps<TTag>, ref: Ref<HTMLElement>) {
	const [open, setOpen] = useState(false);

	const containerRef = useRef<HTMLDivElement>(null);
	const rootRef = useRef<Root | null>(null);
	const drawerRef = useRef(null);
	const isMounted = useRef(false);

	const { options, jobId } = useJobContext(optionsFromProps);

	const { language } = options;

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
			rootRef.current = createRoot(shadowRoot, { identifierPrefix: 'uxybwlk' });
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
			<JobContextProvider options={options} jobId={jobId}>
				<Styles key="style" />
				<IntlProvider locale={language} messages={translations[language]} fallbackOnEmptyString={false}>
					<Drawer setOpen={setOpen} ref={drawerRef} open={open} />
				</IntlProvider>
			</JobContextProvider>,
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
					<div ref={containerRef} />,
					document.body,
				)
			}
		</>
	);
}

export const ApplyButton = forwardRefWithAs(ApplyButtonFn);
