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

export type JobDetailsType = JobListItemType & {
	content: string,
};
