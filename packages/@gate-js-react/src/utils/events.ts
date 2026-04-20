declare global {
	interface Window {
		dataLayer: any[];
	}
}

export function triggerEvent(name: string, params: Record<string, any> = {}) {
	window.dataLayer = window.dataLayer || [];
	window.dataLayer.push({ event: name, ...params });
}
