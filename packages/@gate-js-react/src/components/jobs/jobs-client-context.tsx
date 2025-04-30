'use client';

import {
	createContext, ReactNode, useContext, useMemo,
} from 'react';
import { JobsContextProps } from '../../types/types';

export const JobsClientContext = createContext<JobsContextProps>({
	jobs: null, loading: false, limit: undefined, setLimit: () => {},
});

type JobsClientContextProviderForServerProps = {
	children: ReactNode;
	value: Pick<JobsContextProps, 'jobs' | 'limit'>;
};

export function JobsClientContextProviderForServer({ children, value }: JobsClientContextProviderForServerProps) {
	const parentContext = useContext(JobsClientContext);

	const newValue = useMemo(() => ({ ...parentContext, ...value }), [parentContext, value]);

	return (
		<JobsClientContext.Provider value={newValue}>
			{children}
		</JobsClientContext.Provider>
	);
}
