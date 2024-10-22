'use client';

import React, { useMemo } from 'react';
import { OptionsType } from '@gate-js/core';
import { OptionsContext } from '../../context/options-context';

export type GateOptionsProps = {
	options: Partial<OptionsType>,

	children: React.ReactNode,
};

function GateOptionsFn({
	options,
	children,
}: GateOptionsProps) {
	const ctx = useMemo(() => options, [options]);

	return (
		<OptionsContext.Provider value={ctx}>
			{children}
		</OptionsContext.Provider>
	);
}

GateOptionsFn.displayName = 'GateOptions';

export { GateOptionsFn as GateOptions };
