import { useContext } from 'react';
import { GateContext, GateContextType } from '../context/gate-context';

export function useGateContext(): GateContextType {
	const ctx = useContext(GateContext);

	if (ctx === null) {
		return {
			setSelectedJobId: () => {},
			selectedJobId: undefined,
			filter: false,
			setFilter: () => {},
		};
	}

	return ctx;
}
