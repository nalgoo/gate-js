'use client';

import { JobList, type RenderGroupProps } from "@gate-js/react";
import { TabsContent, TabsTrigger } from "@radix-ui/react-tabs";
import { ListItem } from "./list-item";

export function GroupTrigger({ index, value }: RenderGroupProps) {
    return (
        <TabsTrigger value={String(index)} asChild>
            <button className="data-[state=active]:bg-gray-100 px-2 py-1 rounded-md">
                {value}
            </button>
        </TabsTrigger>
    );
}

export function GroupContent({ index, value }: RenderGroupProps) {
    return (
        <TabsContent value={String(index)}>
            <JobList
                as="ul"
                className="divide-y divide-gray-200"
                renderItem={ListItem}
                group={value}
            />
        </TabsContent>
    );
}
