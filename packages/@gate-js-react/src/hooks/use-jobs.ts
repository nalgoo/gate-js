'use client';

import { useContext } from 'react';
import { JobsClientContext } from '../components/jobs/jobs-client-context';

export function useJobs() {
	return useContext(JobsClientContext);
}
