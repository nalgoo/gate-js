'use client';

import React, { createContext, useMemo } from 'react';

export const JobContext = createContext<number | null>(null);

export type JobContextProviderProps = {
	jobId: number | null,

	children: React.ReactNode,
};

export function JobContextProvider({
	jobId,
	children,
}: JobContextProviderProps) {
	const memoizedJobId = useMemo(() => jobId, [jobId]);

	return (
		<JobContext.Provider value={memoizedJobId}>
			{children}
		</JobContext.Provider>
	);
}
