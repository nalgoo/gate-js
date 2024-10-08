import { ApplicationFormSettingsType, RequestOptionsType } from '../types';
import { getBaseUrl } from '../utils/get-base-url';

export async function getGlobalSettings(options: RequestOptionsType): Promise<ApplicationFormSettingsType> {
	const url = `${getBaseUrl(options)}/global`;

	return fetch(url, { signal: options.abortSignal })
		.then((response: Response) => response.json());
}
