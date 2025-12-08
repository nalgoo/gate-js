import { RequestOptionsType } from '../types';
import { getBaseUrl } from '../utils/get-base-url';
import { FieldType } from '../types/fields';

export async function getFields(options: RequestOptionsType): Promise<ReadonlyMap<string, FieldType>> {
	const requestInit: RequestInit = options.abortSignal ? { signal: options.abortSignal } : {};

	return fetch(`${getBaseUrl(options)}/fields`, requestInit)
		.then((res) => res.json())
		.then((json) => new Map(json.map((field: FieldType) => [field.name, field.type === 'select' ? { ...field, options: new Set(field.options) } : field])));
}
