export type ApplicantPersonalDataType = {
	salutation?: 'mr' | 'mrs' | undefined,

	givenName: string,

	familyName: string,

	email: string,

	phoneNumber: string,
};

export type AnswerType = {
	questionId: number,

	value: string | number | number [],
};

export type QuestionnaireType = {
	identifier: string,

	answers: AnswerType[],
};

export type GdprType = {
	content: string,

	validUntil: Date,
};

export type ApplicationDataType = {
	applicant: ApplicantPersonalDataType,

	resume?: File,

	attachments?: File[],

	questionnaire?: QuestionnaireType,

	gdpr?: GdprType | Array<GdprType>,

	source?: string,
	/**
	 * Legacy SourceId should go here
	 */

	origin?: string | number,

	refId?: string,
};
