'use client';

import { createContext } from 'react';
import { OptionsType } from '@gate-js/core';

export const OptionsContext = createContext<Partial<OptionsType> | null>(null);
