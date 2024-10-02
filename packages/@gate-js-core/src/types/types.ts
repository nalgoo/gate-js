// CONFIG:

import { RequireAtLeastOne } from './helpers';

type BaseAddonType = {
	label: string,
	content?: string,
};

export type CheckboxType = BaseAddonType & {
	type: 'checkbox',
} & ({
	required: true,
	gdpr?: false,
} | {
	required?: false,
	gdpr: true,
});

export type InformationType = BaseAddonType & {
	type: 'information',
};

export type AddonType = CheckboxType | InformationType;

export type ApplyOptionsType = {
	addons?: AddonType[],

	language?: string,

	source?: string | number;

	referral?: string | number;

	darkTheme?: boolean;
};

type GateConfigProperties = {
	/**
	 * Base url for endpoints
	 */
	baseUrl: string,

	/**
	 * Unique organization identifier assigned by Nalgoo
	 */
	organization: string,
};

export type GateConfigType = RequireAtLeastOne<GateConfigProperties>;

// LIST:

export type JobListItemType = {
	id: number,
	title: string,
	validFrom: Date,
	validTo: Date | null,
	language: string,
	applyUrl: string,
	location: string | null,
	salary: string | null,
	salaryDetails: string | null,
	feature: boolean,
	// TODO: type, this should be full-time/part-time/whatever
	// type: string,
};

// DETAILS:

export type JobDetailsType = JobListItemType & {
	content: string,
};

// REQUEST:

export type RequestOptions = {
	/**
	 * AbortSignal
	 */
	abortSignal?: AbortSignal,
} & GateConfigType;

// DUPLICITY:

export type UniqueApplicantDataType = {
	givenName: string,
	familyName: string,
	email: string,
};

// APPLICATION:

export type ApplicantPersonalDataType = {
	salutation: 'mr' | 'mrs',
	givenName: string,
	familyName: string,
	email: string,
	phoneNumber: string,
};

export type Answer = {
	questionId: number,
	value: string | number | number [],
};

export type Questionnaire = {
	identifier: string,
	answers: Answer[],
};

export type ApplicationData = {
	jobId?: number,
	applicant: ApplicantPersonalDataType,
	resume?: File,
	attachments?: File[],
	questionnaire?: Questionnaire,
	gdpr?: {
		contents: string,
		validUntil?: Date,
	},
	// todo:
	sourceId?: number,
	refId?: string,
};
