import {
	ApplyButton,
	JobList,
} from '@gate-js/react';
import { options } from '@/gateConfig';
import { ListItem } from '@/components/list-item';
import { SettingsProvider } from '@/context/settings';
import Link from 'next/link';

export const fetchCache = 'force-no-store';

export default function Home({ searchParams }) {
	return (
		<SettingsProvider dark>
			<main className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
				[
				<Link href="?language=">all languages</Link>
				] [
				<Link href="?language=sk">sk-only</Link>
				]
				<div className="mx-auto max-w-none">
					<div className="overflow-hidden bg-white sm:rounded-lg sm:shadow">
						<div className="border-b border-gray-200 bg-white px-4 py-5 sm:px-6">
							<h1 className="text-base font-semibold leading-6 text-gray-900">
								Open Jobs
							</h1>
						</div>
						<ul className="divide-y divide-gray-200">
							<JobList
								options={{ ...options, filter: { language: searchParams.language } }}
								renderItem={ListItem}
							/>
						</ul>
					</div>
				</div>
				<div className="mt-4 text-center">
					<p>
						Nevyhovuje ti pozicia?
						Daj nam o sebe vediet
					</p>
					<ApplyButton
						className="
							rounded-full bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white
							shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2
							focus-visible:outline-offset-2 focus-visible:outline-indigo-600
						"
						global
						options={{ ...options, darkTheme: true, parse: false }}
					>
						Prihlaska
					</ApplyButton>
				</div>
			</main>
		</SettingsProvider>
	);
}
