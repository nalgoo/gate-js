import { ConnectionOptionsType, OptionsType } from '../types';

export function isConnectionOptions(options?: Partial<OptionsType> | null): options is Partial<OptionsType> & ConnectionOptionsType {
	if (!options) {
		return false;
	}

	return !!(options.organization || options.baseUrl);
}
