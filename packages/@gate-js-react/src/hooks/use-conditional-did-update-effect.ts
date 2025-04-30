import { useEffect, useRef, useState } from 'react';

export function useConditionalDidUpdateEffect(
	fn: () => void | (() => void),
	shouldCallOnFirstRun: boolean,
	inputs: Array<unknown>,
): boolean {
	const isMountingRef = useRef(false);

	const [called, setCalled] = useState(false);

	useEffect(() => {
		isMountingRef.current = true;
	}, []);

	useEffect(() => {
		if (!isMountingRef.current || shouldCallOnFirstRun) {
			setCalled(true);
			return fn();
		}
		isMountingRef.current = false;
		return undefined;
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, inputs);

	return called;
}
