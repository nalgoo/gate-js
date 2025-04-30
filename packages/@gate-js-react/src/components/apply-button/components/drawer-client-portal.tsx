'use client';

import {
	useEffect, useMemo, useRef, useState,
} from 'react';
import { createPortal } from 'react-dom';
import { ApplyOptionsType, TrackingOptionsType } from '@gate-js/core';
import { useOptionsContext } from '../../../hooks/use-options-context';
import { DrawerShadowWrapper } from './drawer-shadow-wrapper';

const DEFAULTS: Required<ApplyOptionsType> & Required<TrackingOptionsType> = {
	language: 'sk',

	darkTheme: false,

	source: 'gate',

	addons: [],

	origin: null,

	refId: null,
};

export function DrawerClientPortal({
	open,
	setOpen,
	options: optionsFromProps,
	global,
}) {
	const optionsFromHook = useOptionsContext(optionsFromProps);

	const options = useMemo(() => (
		{ ...DEFAULTS, ...optionsFromHook }
	), [optionsFromHook]);

	const containerRef = useRef<HTMLDivElement>(null);
	const { darkTheme } = options;

	const [isClient, setIsClient] = useState(false);

	useEffect(() => {
		setIsClient(true);
	}, []);

	return isClient
		? createPortal(
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
				<DrawerShadowWrapper
					open={open}
					setOpen={setOpen}
					options={options}
					global={global}
					containerRef={containerRef}
				/>
			</div>,
			document.body,
		)
		: null;
}
