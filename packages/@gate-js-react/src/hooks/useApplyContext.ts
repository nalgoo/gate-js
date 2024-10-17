import { useContext, useMemo } from 'react';
import { ApplyOptionsType, OptionsType, TrackingOptionsType } from '@gate-js/core';
import { ApplyContext } from '../context/apply-context';

export type ApplyContextOptionsType = Required<ApplyOptionsType> & Required<TrackingOptionsType>;

export type ApplyContextHookType = {
	jobId: number | null,

	options: OptionsType & ApplyContextOptionsType,
};

const DEFAULTS: ApplyContextOptionsType = {
	language: 'sk',

	darkTheme: false,

	source: 'gate',

	addons: [],

	origin: null,

	refId: null,
};

export function useApplyContext(overrideOptions: Partial<OptionsType> = {}): ApplyContextHookType {
	const ctx = useContext(ApplyContext);

	if (ctx === null) {
		throw new Error('Must be used within <ApplyContextProvider />');
	}

	const returnValue = useMemo(() => {
		const { options } = ctx;
		const mergedOptions = { ...DEFAULTS, ...options, ...overrideOptions };

		return { ...ctx, options: mergedOptions };
	}, [ctx, overrideOptions]);

	return returnValue;
}
