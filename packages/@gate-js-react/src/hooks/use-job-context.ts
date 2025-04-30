import { useContext } from 'react';
import { JobContext } from '../context/job-context';

export function useJobContext(): number | null {
	return useContext(JobContext);
}
