'use client';

import React, { createContext, useMemo } from 'react';
import { OptionsType } from '@gate-js/core';

export type JobContextType = {
	options: OptionsType,

	jobId: number,
};

export const JobContext = createContext<JobContextType | null>(null);

export type JobContextProviderProps = JobContextType & {
	children: React.ReactNode,
};

export function JobContextProvider({
	options,
	jobId,
	children,
}: JobContextProviderProps) {
	const ctx = useMemo(() => (
		{ options, jobId }
	), [options, jobId]);

	return (
		<JobContext.Provider value={ctx}>
			{children}
		</JobContext.Provider>
	);
}
