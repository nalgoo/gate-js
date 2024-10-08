export type ApplicantPersonalDataType = {
	salutation: 'mr' | 'mrs',

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

export type ApplicationDataType = {
	applicant: ApplicantPersonalDataType,

	resume?: File,

	attachments?: File[],

	questionnaire?: QuestionnaireType,

	gdpr?: {
		content: string,

		validUntil: Date,
	},

	source?: string,
	/**
	 * Legacy SourceId should go here
	 */

	origin?: string | number,

	refId?: number,
};
