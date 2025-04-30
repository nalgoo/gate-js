import { JobListItemType } from '@gate-js/core';

type ServerContext = {
	jobs: Array<JobListItemType>;
	limit: undefined | number;
};

let resolvePromise:undefined | ((value: ServerContext) => void);

const storedValue = new Promise<ServerContext>((resolve) => { resolvePromise = resolve; });

export function setServerContext(value: ServerContext): void {
	if (resolvePromise) {
		resolvePromise(value);
	}
}

export async function getServerContext(): Promise<ServerContext> {
	return storedValue;
}
