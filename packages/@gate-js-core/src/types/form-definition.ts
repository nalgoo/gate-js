type Option = {
	id: number,

	label: string,

	order: number,

	hidden: boolean,
};

type Section = {
	type: 'section',

	content: string,
};

type Select = {
	type: 'select',

	allowMultiple: boolean,

	options: Array<Option>,
};

type Text = {
	type: 'text',

	validator: {
		type: string | null,
	},
};

export type FormPartDefinition = {
	id: number,

	label: string | null,

	placeholder: string | null

	order: number,

	hidden: boolean,

	required: boolean,
} & (
	Section | Select | Text
);

export type FormDefinition = {
	type: string,

	name: string,

	identifier: string,

	formParts: Array<FormPartDefinition>,

	hidden: boolean,

	id: number,
};
