import { RequestOptions } from '../types/types';

const DEFAULT_BASE_URL = 'https://ats.nalgoo.com/api/v3';

export function getBaseUrl(options: RequestOptions): string {
	const { baseUrl, organization } = { baseUrl: DEFAULT_BASE_URL, organization: undefined, ...options };
	return `${baseUrl.replace(/\/$/, '')}${organization ? `/organizations/${organization}` : ''}`;
}
