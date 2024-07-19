'use client';

import { createContext } from 'react';
import { GateConfigType } from '@gate-js/core';

export type NumOrUndef = number | undefined;

export type GateContextType = {
	config?: GateConfigType,

	setSelectedJobId: ((callback: (prevValue: NumOrUndef) => NumOrUndef) => void) & ((value: NumOrUndef) => void),

	selectedJobId: number | undefined,

	setFilter: ((callback: (prevValue: boolean) => boolean) => void) & ((value: boolean) => void),

	filter: boolean,
};

export const GateContext = createContext<GateContextType | null>(null);
