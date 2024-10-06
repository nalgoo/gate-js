export type OptionDefinitionType = {
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

	options: Array<OptionDefinitionType>,
};

type Text = {
	type: 'text',

	validator: {
		type: string | null,
	},
};

export type FormPartDefinitionType = {
	id: number,

	label: string | null,

	placeholder: string | null

	order: number,

	hidden: boolean,

	required: boolean,
} & (
	Section | Select | Text
);

export type FormDefinitionType = {
	type: string,

	name: string,

	identifier: string,

	formParts: Array<FormPartDefinitionType>,

	hidden: boolean,

	id: number,
};
