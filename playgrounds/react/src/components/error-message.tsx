'use client';

import { RenderErrorProps } from '@gate-js/react';
import { ExclamationTriangleIcon } from '@heroicons/react/20/solid';

export function ErrorMessage({ type }: RenderErrorProps) {
	return (
		<div className="rounded-md bg-yellow-50 p-4">
			<div className="flex">
				<div className="flex-shrink-0">
					<ExclamationTriangleIcon aria-hidden="true" className="h-5 w-5 text-yellow-400" />
				</div>
				<div className="ml-3">
					<h3 className="text-sm font-medium text-yellow-800">
						{
							type === 'not-found'
								? 'The job offer has been closed'
								: 'Something went bad'
						}
					</h3>
					<div className="mt-2 text-sm text-yellow-700">
						<p>
							{
								type !== 'not-found' && [
									'There was an error during connection to Jobs service, please try again later.',
									'We apologize for the inconvenience.',
								]
							}
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}
