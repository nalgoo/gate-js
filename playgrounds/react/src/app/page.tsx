import {
	ApplyButton,
    JobGroups,
	JobList,
	Jobs,
	ShowMoreButton,
} from '@gate-js/react';
import { options } from '@/gateConfig';
import { ListItem } from '@/components/list-item';
import { SettingsProvider } from '@/context/settings';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@radix-ui/react-tabs';
import { GroupContent, GroupTrigger } from '@/components/group';
import { Fragment } from 'react';

export const fetchCache = 'force-no-store';

export default function Home({ searchParams }) {
	return (
		<SettingsProvider dark>
			<main className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
				<div className="mx-auto max-w-none">
                    <Jobs
                        options={
                            { ...options, filter: { language: searchParams.language }, orderBy: searchParams.orderBy, groupBy: 'kraj' }
                        }
                        initialLimit={2}
                    >
                        <div className="overflow-hidden bg-white sm:rounded-lg sm:shadow">
                            <div className="border-b border-gray-200 bg-white px-4 py-5 sm:px-6">
                                <h1 className="text-base font-semibold leading-6 text-gray-900">
                                    Open Jobs
                                </h1>
                            </div>
                            <Tabs defaultValue="0">
                                <TabsList>
                                    <div className="flex space-x-1 px-4 py-2 border-b border-gray-200 gap-4">
                                        <JobGroups renderGroup={GroupTrigger} as={Fragment} showEmptyGroups sortAlphabetically />
                                        <TabsTrigger value="none" asChild>
                                            <button className="data-[state=active]:bg-gray-100 px-2 py-1 rounded-md">
                                                None
                                            </button>
                                        </TabsTrigger>
                                        <TabsTrigger value="all" asChild>
                                            <button className="data-[state=active]:bg-gray-100 px-2 py-1 rounded-md">
                                                All
                                            </button>
                                        </TabsTrigger>
                                    </div>
                                </TabsList>
                                <JobGroups renderGroup={GroupContent} />
                                <TabsContent value="none">
                                    <JobList
                                        as="ul"
                                        className="divide-y divide-gray-200"
                                        renderItem={ListItem}
                                        group={null}
                                    />
                                </TabsContent>
                                <TabsContent value="all">
                                    <JobList
                                        as="ul"
                                        className="divide-y divide-gray-200"
                                        renderItem={ListItem}
                                    />
                                </TabsContent>
                            </Tabs>
                        </div>
                        <ShowMoreButton>Show more</ShowMoreButton>
		            </Jobs>
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
