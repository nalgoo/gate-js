'use client';

import { ApplyButton, RenderItemProps } from '@gate-js/react';
import { BanknotesIcon, MapPinIcon } from '@heroicons/react/20/solid';
import Link from 'next/link';
import { useSettings } from '@/context/settings';

/**
 * This needs to be in separate file with 'use client' if used with Next App Router
 */
export function ListItem({ item }: RenderItemProps) {
	const { largeText } = useSettings();

	return (
		<li>
			<Link href={`/jobs/${item.id}`} className="block hover:bg-gray-50">
				<div className="px-4 py-4 sm:px-6">
					<div className="flex items-center justify-between">
						<h2 className={
								`truncate leading-6 font-medium text-indigo-600 ${largeText ? 'text-lg' : 'text-sm'}`
							}
						>
							{item.title}
						</h2>
						{item.salary && (
							<div className="ml-2 flex flex-shrink-0">
								<span
									className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs
									font-medium text-green-700 ring-1 ring-inset ring-green-600/20"
								>
									<BanknotesIcon className="mr-1.5 h-4 w-4 flex-shrink-0" />
									{item.salary}
								</span>
							</div>
						)}
					</div>
					<div className="mt-2 flex justify-between">
						<div className="sm:flex">
							<div className="flex items-center text-sm text-gray-500">
								<MapPinIcon className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" />
								{item.location}
							</div>
						</div>
						<div className="ml-2 flex items-center text-sm text-gray-500">
							{/* BOTTOM RIGHT */}
						</div>
					</div>
				</div>
			</Link>
		</li>
	);
}
