import { getBaseUrl } from '../utils/get-base-url';
import {
	AnswerType,
	ApplicationDataType,
	AttachmentType,
	CandidateType,
	FormPartType,
	FormResponseType,
	ImportInputType,
	RequestOptionsType,
} from '../types';
import { getFileContentsBase64 } from '../utils/get-file-contents-base64';

function answerToResponsePart(answer: AnswerType): FormPartType {
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

async function formatBody(applicationData: ApplicationDataType): Promise<string> {
	const {
		applicant,
		resume,
		attachments: attachedFiles,
		gdpr,
		questionnaire,
		source,
		origin,
		refId,
	} = applicationData;

	const attachments: AttachmentType[] = [
		...resume ? [{
			type: 'resume' as const,
			bytes: await getFileContentsBase64(resume),
			fileName: resume.name,
		}] : [],
		...gdpr ? [{
			type: 'gdpr' as const,
			binaryContents: gdpr.content,
			validUntil: gdpr.validUntil,
		}] : [],
		...attachedFiles
			? await Promise.all(attachedFiles.map(async (file: File) => ({
				bytes: await getFileContentsBase64(file),
				fileName: file.name,
			})))
			: [],
	];

	const candidate: CandidateType = {
		givenName: applicant.givenName,
		familyName: applicant.familyName,
		contacts: [applicant.email, applicant.phoneNumber],
		gender: applicant.salutation === 'mrs' ? 'female' : 'male',
		language: 'sk',
	};

	const formResponse: FormResponseType | undefined = questionnaire
		? {
			identifier: questionnaire.identifier,
			response: {
				formResponseParts: questionnaire.answers.map(answerToResponsePart),
			},
		}
		: undefined;

	const importInput: ImportInputType = {
		candidate,
		attachments,
		formResponse,
		source,
		sourceId: typeof origin === 'number' ? origin : undefined,
		origin: typeof origin === 'string' ? origin : undefined,
		refId,
	};

	return JSON.stringify(importInput);
}

export async function createJobApplication(
	applicationData: ApplicationDataType,
	options: RequestOptionsType,
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
