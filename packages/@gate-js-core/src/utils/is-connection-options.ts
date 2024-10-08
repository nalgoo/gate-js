import { ConnectionOptionsType, OptionsType } from '../types';

export function isConnectionOptions(options?: Partial<OptionsType> | null): options is ConnectionOptionsType {
	if (!options) {
		return false;
	}

	return !!(options.organization || options.baseUrl);
}
