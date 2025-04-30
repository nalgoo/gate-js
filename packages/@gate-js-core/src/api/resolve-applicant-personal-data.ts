import { ApplicantPersonalDataType, RequestOptionsType } from '../types';
import { getBaseUrl } from '../utils/get-base-url';
import { logError, logWarning } from '../utils/console';

function matchGender(gender: string): 'mr' | 'mrs' | undefined {
	if (gender === 'male') {
		return 'mr';
	}

	if (gender === 'female') {
		return 'mrs';
	}

	return undefined;
}

function sanitizeString<T>(value: T | string): undefined | string {
	if (typeof value === 'string') {
		return value.trim();
	}
	return undefined;
}

export async function resolveApplicantPersonalData(
	file: File,
	options: RequestOptionsType,
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
			givenName: sanitizeString(givenName),
			familyName: sanitizeString(familyName),
			email: sanitizeString(email),
			phoneNumber: sanitizeString(phoneNumber),
			salutation: matchGender(gender),
		};
	} catch (err: unknown) {
		if (err instanceof Error && err.name === 'TimeoutError') {
			logWarning(`Timeout while parsing resume (${timeout} ms)`);
		} else {
			logError(err);
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
