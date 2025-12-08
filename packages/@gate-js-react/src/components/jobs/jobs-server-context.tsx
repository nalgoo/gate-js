import { type GroupIndexType, type JobListItemWithGroupType } from '@gate-js/core';

type ServerContext = {
	jobs: Array<JobListItemWithGroupType>;
    groups: Set<GroupIndexType>;
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
