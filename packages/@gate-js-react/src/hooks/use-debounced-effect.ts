import { DependencyList, EffectCallback, useEffect } from 'react';

export function useDebouncedEffect(effect: EffectCallback, deps: DependencyList = [], timeout = 300) {
	useEffect(() => {
		const handler = setTimeout(effect, timeout);

		return () => clearTimeout(handler);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, deps);
}
