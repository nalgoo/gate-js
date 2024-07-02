'use client';

import { GateProps } from '../../types/types.ts';
import { GateContext } from '../../context/gate-context.tsx';
import { useState } from 'react';

export function Gate({
	children,
	config,
	selectedJobId: initialJobId,
}: GateProps) {
	const [selectedJobId, setSelectedJobId] = useState<number|undefined>(initialJobId);

	const [filter, setFilter] = useState(false);

	const ctx = { config, setSelectedJobId, selectedJobId, setFilter, filter };

	return (
		<GateContext.Provider value={ctx}>
			{typeof children === 'function' ? children(ctx) : children}
		</GateContext.Provider>
	);
}
