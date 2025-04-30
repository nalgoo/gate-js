import { JobDetailsType, JobNotFoundType } from '@gate-js/core';

export function isError(response: JobDetailsType | JobNotFoundType): response is JobNotFoundType {
	return (response as JobNotFoundType).error === 'not-found';
}
