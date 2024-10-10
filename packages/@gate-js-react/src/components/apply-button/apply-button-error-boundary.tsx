import { ElementType } from 'react';
import { ErrorBoundary, FallbackProps } from 'react-error-boundary';
import { ApplyButton, ApplyButtonProps } from './apply-button';

const DEFAULT_TAG = 'button' as const;

export function ApplyButtonErrorBoundary<TTag extends ElementType = typeof DEFAULT_TAG>(props: ApplyButtonProps<TTag>) {
	const fallback = ({ error }: FallbackProps) => (
		<div>
			{error.message}
		</div>
	);

	return (
		<ErrorBoundary fallbackRender={fallback}>
			{/* eslint-disable-next-line react/jsx-props-no-spreading */}
			<ApplyButton {...props} />
		</ErrorBoundary>
	);
}
