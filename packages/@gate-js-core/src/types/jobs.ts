import { ApplicationFormSettingsType } from './application-form';

export type UserProfileType = {
	displayName: string,

	email: string,

	phone: string | null,

	picture: string | null

	position: string | null,
};

export type JobListItemType = ApplicationFormSettingsType & {
	id: number,

	title: string,

	// validFrom: Date,

	// validTo: Date | null,

	language: string | null,

	location: string | null,

	salary: string | null,

	salaryInfo: string | null,

	featured: boolean,

	employmentForms: Array<{ id: number, name: string }>,

	fields: Record<string, (string | { label: string })>,

	file: string | null,

	user: UserProfileType,
};

export type JobDetailsType = JobListItemType & {
	content: string,
};
