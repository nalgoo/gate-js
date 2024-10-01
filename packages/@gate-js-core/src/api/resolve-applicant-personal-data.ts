import { ApplicantPersonalDataType, RequestOptions } from '../types/types';
import { getBaseUrl } from '../utils/get-base-url';
import { error, warn } from '../utils/console';

function matchGender(gender: string): 'mr' | 'mrs' | undefined {
	if (gender === 'male') {
		return 'mr';
	}

	if (gender === 'female') {
		return 'mrs';
	}

	return undefined;
}

export async function resolveApplicantPersonalData(
	file: File,
	options: RequestOptions,
	timeout: number = 10000,
): Promise<Partial<ApplicantPersonalDataType>> {
	const formData = new FormData();
	formData.append('file', file, file.name);

	const requestInit: RequestInit = {
		method: 'POST',
		body: formData,
		...(options.abortSignal ? { signal: options.abortSignal } : {}),
	} as RequestInit;

	try {
		const response = await fetch(`${getBaseUrl(options)}/resume-parsings`, requestInit);

		if (!('baseUrl' in options) && response.status === 404 && !options.organization) {
			throw new Error('Endpoint not found, please set `organization` parameter');
		}

		if (!response.ok) {
			throw new Error('Unexpected response');
		}

		const {
			givenName,
			familyName,
			email,
			phoneNumber,
			gender,
		} = await response.json();

		return {
			givenName,
			familyName,
			email,
			phoneNumber,
			salutation: matchGender(gender),
		};
	} catch (err: unknown) {
		if (err instanceof Error && err.name === 'TimeoutError') {
			warn(`Timeout while parsing resume (${timeout} ms)`);
		} else {
			error(err);
		}

		return {
			salutation: undefined,
			givenName: undefined,
			familyName: undefined,
			email: undefined,
			phoneNumber: undefined,
		};
	}
}
