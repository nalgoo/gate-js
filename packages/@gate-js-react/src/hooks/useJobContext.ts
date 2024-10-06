import { useContext } from 'react';
import { ApplyOptionsType, OptionsType, TrackingOptionsType } from '@gate-js/core';
import { JobContext } from '../context/job-context';

export type JobContextOptionsType = Required<ApplyOptionsType> & Required<TrackingOptionsType>;

export type JobContextHookType = {
	jobId: number,

	options: OptionsType & JobContextOptionsType,
};

const DEFAULTS: JobContextOptionsType = {
	language: 'sk',

	darkTheme: false,

	source: 'gate',

	addons: [],

	origin: null,

	refId: null,
};

export function useJobContext(overrideOptions: Partial<OptionsType> = {}): JobContextHookType {
	const ctx = useContext(JobContext);

	if (ctx === null) {
		throw new Error('Must be used within <JobContextProvider />');
	}

	const { options } = ctx;
	const mergedOptions = { ...DEFAULTS, ...options, ...overrideOptions };

	return { ...ctx, options: mergedOptions };
}
