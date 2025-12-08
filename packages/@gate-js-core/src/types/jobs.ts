import { ApplicationFormSettingsType } from './application-form';
import type { FieldValueType } from './fields';
import type { GroupIndexType } from './grouping';

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

	updatedOn: Date,

	publishedOn: Date,

	language: string | null,

	location: string | null,

	salary: string | null,

	salaryInfo: string | null,

	featured: boolean,

	employmentForms: Array<{ id: number, name: string }>,

	fields: Record<string, FieldValueType>,

	file: string | null,

	user: UserProfileType,
};

export type JobListItemWithGroupType = JobListItemType & {
    groups: GroupIndexType[];
};

export type JobDetailsType = JobListItemType & {
	content: string,
};
