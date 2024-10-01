import { useRef } from 'react';

export function useMultipleRef<T>(count: number) {
	return Array(count).map(useRef<T>);
}
