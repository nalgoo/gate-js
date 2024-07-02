'use client';

import { useGate } from '../../context/gate-context.tsx';

export function JobFilter() {
	const { setFilter, filter } = useGate();

	return (
		<button onClick={() => setFilter((prevValue: boolean) => !prevValue)}>
			[FILTER: {filter ? 'on' : 'off'}]
		</button>
	);
}
