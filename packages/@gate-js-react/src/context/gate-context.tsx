'use client';

import { createContext, useContext } from 'react';
import { GateConfigType } from '@gate-js/core';

export type GateContextType = {
	config?: GateConfigType,

	setSelectedJobId: ((callback: (prevValue: number|undefined) => number|undefined) => void) & ((value: number|undefined) => void),

	selectedJobId: number|undefined,

	setFilter: ((callback: (prevValue: boolean) => boolean) => void) & ((value: boolean) => void),

	filter: boolean,
};

export const GateContext = createContext<GateContextType|null>(null);

export function useGate(): GateContextType {
	const ctx = useContext(GateContext);

	if (ctx === null) {
		throw new Error('Must be used within <JobContextProvider />');
	}

	return ctx;
}
