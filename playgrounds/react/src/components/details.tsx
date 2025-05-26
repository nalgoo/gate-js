'use client';

import { ApplyButton, JobContent, RenderDetailsProps } from '@gate-js/react';
import { BriefcaseIcon, CurrencyEuroIcon, MapPinIcon } from '@heroicons/react/20/solid';

export function Details({ job }: RenderDetailsProps) {
	return (
		<div className="space-y-8">
			<div className="lg:flex lg:items-center lg:justify-between">
				<div className="min-w-0 flex-1">
					<h1
						className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight"
					>
						{job.title}
					</h1>
					<div className="mt-1 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-6">
						<div className="mt-2 flex items-center text-sm text-gray-500">
							<BriefcaseIcon aria-hidden="true" className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" />
							Full-time
						</div>
						<div className="mt-2 flex items-center text-sm text-gray-500">
							<MapPinIcon aria-hidden="true" className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" />
							Remote
						</div>
						{job.salary && (
							<div className="mt-2 flex items-center text-sm text-gray-500">
								<CurrencyEuroIcon
									aria-hidden="true"
									className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
								/>
								{job.salary}
							</div>
						)}
					</div>
				</div>
			</div>
			<div className="prose">
				<JobContent>{job.content}</JobContent>
			</div>
			<ApplyButton
				initialOpen
				className="rounded-full bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm
					hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2
					focus-visible:outline-indigo-600"
			>
				Apply
			</ApplyButton>
		</div>
	);
}
