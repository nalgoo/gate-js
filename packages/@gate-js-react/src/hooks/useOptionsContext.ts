import { useContext } from 'react';
import { OptionsType } from '@gate-js/core';
import { OptionsContext } from '../context/options-context';

export function useOptionsContext(overrideOptions: Partial<OptionsType> = {}): Partial<OptionsType> | null {
	const ctx = useContext(OptionsContext) || {};

	return { ...ctx, ...overrideOptions };
}
