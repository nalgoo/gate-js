export type AttachmentType = {
	fileName?: string,
} & ({
	/**
	 * Base64 encoded contents
	 */
	bytes: string,
} | {
	binaryContents: string,
}) & ({
	type: 'gdpr',

	validUntil: Date,
} | {
	type?: null | 'resume' | 'photo' | 'cover-letter' | 'motivation-letter',
});

export type CandidateType = {
	givenName: string,

	familyName: string,

	gender: 'male' | 'female',

	language: string,

	contacts: string[],
};

export type FormPartType = {
	formPartId: number,
} & ({
	value: string,
} | {
	formPartOptions: Array<number>,
});

export type FormResponseType = {
	identifier: string,

	response: {
		formResponseParts: Array<FormPartType>,
	}
};

export type ImportInputType = {
	candidate: CandidateType,

	attachments: Array<AttachmentType>,

	formResponse?: FormResponseType,

	source?: string,

	sourceId?: number,

	origin?: string,

	refId?: string,
};
