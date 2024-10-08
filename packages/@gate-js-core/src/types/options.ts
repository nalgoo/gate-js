import { RequireAtLeastOne } from '../utils/require-at-least-one';

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
	refId?: number | null,
};

type BaseAddon = {
	label: string,

	content?: string,
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

	source?: string;

	darkTheme?: boolean;
};

export type ConnectionOptionsType = RequireAtLeastOne<{
	/**
	 * Base url for endpoints
	 */
	baseUrl?: string,

	/**
	 * Unique organization identifier assigned by Nalgoo
	 */
	organization?: string,
}>;

export type OptionsType = ConnectionOptionsType & ApplyOptionsType & TrackingOptionsType;

export type RequestOptionsType = {
	/**
	 * AbortSignal
	 */
	abortSignal?: AbortSignal,
} & ConnectionOptionsType;
