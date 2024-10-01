'use client';

import {
	createContext,
	ReactNode,
	useContext,
	useMemo,
} from 'react';

const SettingsContext = createContext({ dark: false, largeText: false });

export function useSettings() {
	return useContext(SettingsContext);
}

type SettingProviderProps = {
	children: ReactNode,
	largeText?: boolean,
	dark?: boolean,
};

export function SettingsProvider({ children, largeText, dark }: SettingProviderProps) {
	const ctx = useMemo(() => ({
		dark: dark || false,
		largeText: largeText || false,
	}), [dark, largeText]);

	return (
		<SettingsContext.Provider value={ctx}>
			{children}
		</SettingsContext.Provider>
	);
}
