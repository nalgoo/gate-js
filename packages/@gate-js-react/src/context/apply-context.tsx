'use client';

import React, { createContext, useMemo } from 'react';
import { ApplyOptionsType, OptionsType, TrackingOptionsType } from '@gate-js/core';

export type ApplyContextOptionsType = OptionsType & Required<ApplyOptionsType> & Required<TrackingOptionsType>;

export type ApplyContextType = {
	options: ApplyContextOptionsType,

	jobId: number | null,
};

export const ApplyContext = createContext<ApplyContextType | null>(null);

export type ApplyContextProviderProps = ApplyContextType & {
	children: React.ReactNode,
};

function ApplyContextProviderFn({
	options,
	jobId,
	children,
}: ApplyContextProviderProps) {
	const ctx = useMemo(() => (
		{ options, jobId }
	), [options, jobId]);

	return (
		<ApplyContext.Provider value={ctx}>
			{children}
		</ApplyContext.Provider>
	);
}

ApplyContextProviderFn.displayName = 'ApplyContextProvider';

export { ApplyContextProviderFn as ApplyContextProvider };
