type ConsoleParams = Parameters<typeof console.warn>;

export function warn(message: ConsoleParams[0], ...optionalParams: ConsoleParams): void {
	// eslint-disable-next-line no-console
	console.warn(message, ...optionalParams);
}

export function error(message: ConsoleParams[0], ...optionalParams: ConsoleParams): void {
	// eslint-disable-next-line no-console
	console.error(message, ...optionalParams);
}
