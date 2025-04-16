/*
	Workaround for problem with shoelace and SSR
	There is a usage of global `window` variable somewhere in shoelace library (EyeDropper component)
	Which will cause SSR error in Next.js resulting to http 500 error

	Importing single components will skip executing problematic line
*/

// @ts-expect-error see comment
export { default as SlAlert } from '@shoelace-style/shoelace/dist/react/alert';
// @ts-expect-error see comment
export { default as SlButton } from '@shoelace-style/shoelace/dist/react/button';
// @ts-expect-error see comment
export { default as SlCheckbox } from '@shoelace-style/shoelace/dist/react/checkbox';
// @ts-expect-error see comment
export { default as SlDialog } from '@shoelace-style/shoelace/dist/react/dialog';
// @ts-expect-error see comment
export { default as SlDivider } from '@shoelace-style/shoelace/dist/react/divider';
// @ts-expect-error see comment
export { default as SlDrawer } from '@shoelace-style/shoelace/dist/react/drawer';
// @ts-expect-error see comment
export { default as SlFormatDate } from '@shoelace-style/shoelace/dist/react/format-date';
// @ts-expect-error see comment
export { default as SlIcon } from '@shoelace-style/shoelace/dist/react/icon';
// @ts-expect-error see comment
export { default as SlIconButton } from '@shoelace-style/shoelace/dist/react/icon-button';
// @ts-expect-error see comment
export { default as SlInput } from '@shoelace-style/shoelace/dist/react/input';
// @ts-expect-error see comment
export { default as SlOption } from '@shoelace-style/shoelace/dist/react/option';
// @ts-expect-error see comment
export { default as SlProgressBar } from '@shoelace-style/shoelace/dist/react/progress-bar';
// @ts-expect-error see comment
export { default as SlSelect } from '@shoelace-style/shoelace/dist/react/select';
// @ts-expect-error see comment
export { default as SlTooltip } from '@shoelace-style/shoelace/dist/react/tooltip';
// @ts-expect-error see comment
export { default as SlVisuallyHidden } from '@shoelace-style/shoelace/dist/react/visually-hidden';

export type { SlChangeEvent, SlDrawer as SlDrawerType } from '@shoelace-style/shoelace';

// @ts-expect-error see comment
export { registerIconLibrary, unregisterIconLibrary } from '@shoelace-style/shoelace/dist/utilities/icon-library';
// @ts-expect-error see comment
export type { IconLibrary } from '@shoelace-style/shoelace/cdn/components/icon/library';
