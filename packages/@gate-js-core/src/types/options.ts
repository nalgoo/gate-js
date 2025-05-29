import { RequireAtLeastOne } from '../utils/require-at-least-one';
import { FilterType } from './filter';
import { JobListItemType } from './jobs';

export type TrackingOptionsType = {
	/**
	 * legacy SourceId should be set here
	 * todo: should there be null?
	 */
	origin?: string | number | null,

	/**
	 * Used in referral
	 * todo: should there be null?
	 */
	refId?: string | null,
};

type BaseAddon = {
	label: string,

	content?: string,

	/**
	 * If `true`, this addon will be shown on first screen, before resume
	 */
	showOnStart?: boolean,
};

export type CheckboxType = BaseAddon & {
	type: 'checkbox',
} & ({
	required: true,

	gdpr?: false,
} | {
	required?: false,

	gdpr: true,

	validUntil: Date,
});

export type InformationType = BaseAddon & {
	type: 'information',
};

export type AddonType = CheckboxType | InformationType;

export type ApplyOptionsType = {
	addons?: AddonType[],

	language?: string,

	source?: string,

	darkTheme?: boolean,

	fields?: {
		salutation?: boolean,
	},

	/**
	 * If set to false, resume won't be parsed and personal data won't be prefilled
	 * default: true
	 */
	parse?: boolean,

	thankYou?: null | string | {
		heading?: string,

		message?: string,
	}
};

export type ConnectionOptionsType = RequireAtLeastOne<{
	/**
	 * Base url for endpoints
	 */
	baseUrl: string,

	/**
	 * Unique organization identifier assigned by Nalgoo
	 */
	organization: string,
}>;

export type FilterOptionsType = {
	filter?: FilterType,
};

export type OptionsType = ConnectionOptionsType & ApplyOptionsType & TrackingOptionsType & FilterOptionsType;

export type RequestOptionsType = {
	/**
	 * AbortSignal
	 */
	abortSignal?: AbortSignal,
} & ConnectionOptionsType;

export type SortingOptionsType = {
	invertSorting?: boolean,
} & (
	{
		sortingFn?: (a: JobListItemType, b: JobListItemType) => number,

		orderBy?: never,
	} | {
		sortingFn?: never,

		orderBy?: 'updatedOn' | 'publishedOn' | 'title',
	}
);
