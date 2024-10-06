import { RequestOptionsType } from '../types';

const DEFAULT_BASE_URL = 'https://ats.nalgoo.com/api/v3';

export function getBaseUrl(options: RequestOptionsType): string {
	const { baseUrl, organization } = { baseUrl: DEFAULT_BASE_URL, organization: undefined, ...options };
	return `${baseUrl.replace(/\/$/, '')}${organization ? `/organizations/${organization}` : ''}`;
}
