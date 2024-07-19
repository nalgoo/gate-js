'use client';

import React, { createContext, useMemo } from 'react';
import { GateConfigType } from '@gate-js/core';

export type JobContextType = {
	config: GateConfigType,

	jobId: number,
};

export const JobContext = createContext<JobContextType | null>(null);

export type JobContextProviderProps = {
	config: GateConfigType,
	jobId: number,
	children: React.ReactNode,
};

export function JobContextProvider({ config, jobId, children }: JobContextProviderProps) {
	const ctx = useMemo(() => (
		{ config, jobId }
	), [config, jobId]);

	return (
		<JobContext.Provider value={ctx}>
			{children}
		</JobContext.Provider>
	);
}
