import { useContext } from 'react';
import { JobContext, JobContextType } from '../context/job-context';

export function useJobContext(): JobContextType {
	const ctx = useContext(JobContext);

	if (ctx === null) {
		throw new Error('Must be used within <JobContextProvider />');
	}

	return ctx;
}
