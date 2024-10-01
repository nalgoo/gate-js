import { useId } from 'react';

export function useSafeId() {
	return `gate-js${useId().replaceAll(':', '__')}`;
}
