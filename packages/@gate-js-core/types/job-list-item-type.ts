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

/*
 export class JobListItemType {
 	constructor(
 		private _id: number,
 		private _title: string,
 		private _validFrom: Date,
 		private _validTo: Date|null = null,
 		private _language: string,
 		private _applyUrl: string,
 		private _location: string|null = null,
 		private _salary: string|null = null,
 		private _type: string|null = null,
 		private _featured: boolean = false,
 	) {
 	}
 	get type(): string | null {
 		return this._type;
 	}
 	get id(): number {
 		return this._id;
 	}

 	get title(): string {
 		return this._title;
 	}

 	get validFrom(): Date {
 		return this._validFrom;
 	}

 	get validTo(): Date | null {
 		return this._validTo;
 	}

 	get language(): string {
 		return this._language;
 	}

 	get featured(): boolean {
 		return this._featured;
 	}
 	get applyUrl(): string {
 		return this._applyUrl;
 	}

 	get location(): string|null {
 		return this._location;
 	}

 	get salary(): string|null {
 		return this._salary;
 	}
 }
*/
