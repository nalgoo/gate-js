'use client';

import { useGateContext } from '../../hooks/useGateContext';

export function JobFilter() {
	const { setFilter, filter } = useGateContext();

	return (
		<button
			type="button"
			onClick={() => setFilter((prevValue: boolean) => !prevValue)}
		>
			[FILTER:
			{' '}
			{filter ? 'on' : 'off'}
			]
		</button>
	);
}
