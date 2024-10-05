'use client';

import React, { createContext, useMemo } from 'react';
import { ApplyOptionsType, GateConfigType } from '@gate-js/core';

export type JobContextType = {
	config: GateConfigType,

	applyOptions: Required<ApplyOptionsType>,

	jobId: number,
};

export const JobContext = createContext<JobContextType | null>(null);

export type JobContextProviderProps = {
	config: GateConfigType,

	applyOptions?: ApplyOptionsType,

	jobId: number,

	children: React.ReactNode,
};

export function JobContextProvider({
	config,
	applyOptions,
	jobId,
	children,
}: JobContextProviderProps) {
	const ctx = useMemo(() => (
		{ config, applyOptions, jobId }
	), [config, applyOptions, jobId]);

	return (
		<JobContext.Provider value={ctx}>
			{children}
		</JobContext.Provider>
	);
}
