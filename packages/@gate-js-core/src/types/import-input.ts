export type Attachment = {
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
	type?: 'resume' | 'photo' | 'cover-letter' | 'motivation-letter',
});

export type Candidate = {
	givenName: string,

	familyName: string,

	gender: 'male' | 'female',

	language: string,

	contacts: string[],
};

export type FormPart = {
	formPartId: number,
} & ({
	value: string,
} | {
	formPartOptions: Array<number>,
});

export type FormResponse = {
	identifier: string,

	response: {
		formResponseParts: Array<FormPart>,
	}
};

export type ImportInput = {
	candidate: Candidate,

	attachments: Array<Attachment>,

	formResponse?: FormResponse,

	source?: string,

	sourceId?: number,

	origin?: string,

	refId?: number,
};
