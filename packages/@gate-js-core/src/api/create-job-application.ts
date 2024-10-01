import { Answer, ApplicationData, RequestOptions } from '../types/types';
import { getBaseUrl } from '../utils/get-base-url';
import { Attachment, Candidate, FormPart, FormResponse, ImportInput } from '../types/import-input';
import { getFileContentsBase64 } from '../utils/get-file-contents-base64';

function answerToResponsePart(answer: Answer): FormPart {
	const { questionId: formPartId, value } = answer;

	if (typeof value === 'number') {
		return {
			formPartId,
			formPartOptions: [value],
		};
	}

	if (Array.isArray(value)) {
		return {
			formPartId,
			formPartOptions: value,
		};
	}

	return {
		formPartId,
		value,
	};
}

async function formatBody(applicationData: ApplicationData): Promise<string> {
	const {
		applicant,
		resume,
		attachments: attachedFiles,
		gdpr,
	} = applicationData;
	const attachments: Attachment[] = [
		...resume ? [{
			type: 'resume' as const,
			bytes: await getFileContentsBase64(resume),
			fileName: resume.name,
		}] : [],
		...gdpr ? [{
			type: 'gdpr' as const,
			binaryContents: gdpr.contents,
			validUntil: gdpr.validUntil,
		}] : [],
		...attachedFiles
			? await Promise.all(attachedFiles.map(async (file: File) => ({
				bytes: await getFileContentsBase64(file),
				fileName: file.name,
			})))
			: [],
	];

	const candidate: Candidate = {
		givenName: applicant.givenName,
		familyName: applicant.familyName,
		contacts: [applicant.email, applicant.phoneNumber],
		gender: applicant.salutation === 'mrs' ? 'female' : 'male',
		language: 'sk',
	};

	const formResponse: FormResponse | undefined = applicationData.questionnaire
		? {
			identifier: applicationData.questionnaire.identifier,
			response: {
				formResponseParts: applicationData.questionnaire.answers.map(answerToResponsePart),
			},
		}
		: undefined;

	const importInput: ImportInput = {
		candidate,
		attachments,
		formResponse,

	};

	return JSON.stringify(importInput);
}

export async function createJobApplication(
	applicationData: ApplicationData,
	options: RequestOptions,
): Promise<boolean> {
	const { jobId } = applicationData;

	const url = `${getBaseUrl(options)}${jobId ? `/jobs/${jobId}` : ''}/import`;

	const body = await formatBody(applicationData);

	const requestInit: RequestInit = {
		method: 'POST',
		body,
		headers: {
			'Content-Type': 'application/json',
		},
		...(options.abortSignal ? { signal: options.abortSignal } : {}),
	};

	return fetch(url, requestInit)
		.then((response) => {
			if (!response.ok) {
				throw new Error('Unexpected response');
			}
			return true;
		})
		.catch(() => false);
}
