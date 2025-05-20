import {
	AnswerType, ApplicantPersonalDataType,
	ApplicationDataType,
	AttachmentType,
	CandidateType,
	FormPartType,
	FormResponseType, GdprType,
	ImportInputType,
} from '../types';
import { getFileContentsBase64 } from './get-file-contents-base64';

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

function isHtml(s: string): boolean {
	return /<\/?[a-z][\s\S]*>/i.test(s);
}

function getGender(applicant: ApplicantPersonalDataType): 'male' | 'female' | null {
	if (!applicant.salutation) {
		return null;
	}
	return applicant.salutation === 'mrs' ? 'female' : 'male';
}

function getGdprFileName(html: boolean, ourIndex: number, total: number): string {
	const index = total === 1
		? ''
		: `-${ourIndex + 1}`;

	return `gdpr${index}.${html ? 'html' : 'txt'}`;
}

function getGdpr(gdpr: GdprType | Array<GdprType> | undefined): Array<AttachmentType> {
	if (!gdpr) {
		return [];
	}

	// make it array
	const a = Array.isArray(gdpr) ? gdpr : [gdpr];

	return a.map((item, idx) => ({
		type: 'gdpr' as const,
		binaryContents: item.content,
		validUntil: item.validUntil,
		fileName: getGdprFileName(isHtml(item.content), idx, a.length),
	}));
}

export async function formatApplicationBody(applicationData: ApplicationDataType): Promise<string> {
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

	const attachments: AttachmentType[] = [];

	// add resume if set
	if (resume) {
		attachments.push({
			type: 'resume' as const,
			bytes: await getFileContentsBase64(resume),
			fileName: resume.name,
		});
	}

	// add gdpr as attachments, even multiple if it's array
	attachments.push(...getGdpr(gdpr));

	// add other attachments
	if (attachedFiles) {
		attachments.push(
			...await Promise.all(
				attachedFiles.map(async (file: File) => ({
					bytes: await getFileContentsBase64(file),
					fileName: file.name,
				})),
			),
		);
	}

	const candidate: CandidateType = {
		givenName: applicant.givenName,
		familyName: applicant.familyName,
		contacts: [applicant.email, applicant.phoneNumber],
		gender: getGender(applicant),
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
