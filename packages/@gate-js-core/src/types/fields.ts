export type TypeOfFieldWithOptionsType = 'select';

export type TypeOfFieldWithoutOptionsType = 'date' | 'text';

export type TypeOfFieldType = TypeOfFieldWithOptionsType | TypeOfFieldWithoutOptionsType;

export type FieldOptionType = string;

export type FieldType = {
	name: string,
	label: string,
} & (
	{
		type: TypeOfFieldWithOptionsType,
		options: Array<FieldOptionType>,
	} | {
		type: TypeOfFieldWithoutOptionsType,
	}
);
