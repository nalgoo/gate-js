import { RequestOptionsType, TrackingOptionsType } from '../types';
import { getBaseUrl } from '../utils/get-base-url';
import { logError } from '../utils/console';

export async function trackJobView(
	jobId: number,
	options: RequestOptionsType & TrackingOptionsType,
): Promise<boolean> {
	const url = `${getBaseUrl(options)}/jobs/${jobId}/stats/view`;

	const { origin, refId } = options;

	const body = { ...{ refId }, ...{ [typeof origin === 'string' ? 'referrer' : 'sourceId']: origin } };

	const requestInit = {
		method: 'POST',
		body: JSON.stringify(body),
		headers: { 'Content-Type': 'application/json' },
		...options.abortSignal ? { signal: options.abortSignal } : {},
	};

	return fetch(url, requestInit)
		.then(() => true)
		.catch((err) => {
			logError(err);
			return false;
		});
}
