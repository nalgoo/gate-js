'use client';

import { useMemo, useState } from 'react';
import { GateProps } from '../../types/types';
import { GateContext } from '../../context/gate-context';

export function Gate({
	children,
	config,
	initialJobId,
}: GateProps) {
	const [selectedJobId, setSelectedJobId] = useState<number | undefined>(initialJobId);

	const [filter, setFilter] = useState(false);

	const ctx = useMemo(() => (
		{
			config, setSelectedJobId, selectedJobId, setFilter, filter,
		}
	), [config, setSelectedJobId, selectedJobId, setFilter, filter]);

	return (
		<GateContext.Provider value={ctx}>
			{typeof children === 'function' ? children(ctx) : children}
		</GateContext.Provider>
	);
}
