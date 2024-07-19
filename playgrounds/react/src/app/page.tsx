import React from 'react';
import {
	Gate,
	JobList,
} from '@gate-js/react';
import { apiConfig } from '@/apiConfig';
import { ListItem } from '@/components/list-item';

export default function Home() {
	return (
		<main className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
			<div className="mx-auto max-w-none">
				<div className="overflow-hidden bg-white sm:rounded-lg sm:shadow">
					<div className="border-b border-gray-200 bg-white px-4 py-5 sm:px-6">
						<h1 className="text-base font-semibold leading-6 text-gray-900">
							Open Jobs
						</h1>
					</div>
					<Gate>
						<ul className="divide-y divide-gray-200">
							<JobList
								config={apiConfig}
								renderItem={ListItem}
							/>
						</ul>
					</Gate>
				</div>
			</div>
		</main>
	);
}
