import { useContext } from 'react';
import { ApplyOptionsType } from '@gate-js/core';
import { JobContext, JobContextType } from '../context/job-context';

const DEFAULTS: Required<ApplyOptionsType> = {
	language: 'sk',

	darkTheme: false,

	source: 'gate',

	addons: [],

	origin: null,

	refId: null,
};

export function useJobContext(overrideOptions: ApplyOptionsType = {}): Required<JobContextType> {
	const ctx = useContext(JobContext);

	if (ctx === null) {
		throw new Error('Must be used within <JobContextProvider />');
	}

	const { applyOptions } = ctx;
	const mergedApplyOptions = { ...DEFAULTS, ...applyOptions, ...overrideOptions };

	return { ...ctx, applyOptions: mergedApplyOptions };
}
