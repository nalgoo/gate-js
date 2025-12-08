'use client';

import type { ReactNode } from 'react';
import type { JobGroupsBaseProps } from '../../types/types';
import { useJobs } from '../../hooks/use-jobs';
import { setIntersectionPreserve } from '../../utils/setIntersectionPreserve';

export type JobGroupsClientProps = JobGroupsBaseProps & {
	preRenderedContent?: ReactNode,
};

function JobGroupsClientFn({
    renderGroup,
    preRenderedContent,
    showEmptyGroups,
    sortAlphabetically,
}: JobGroupsClientProps) {
    const { jobs, groups: allGroups } = useJobs();

	const Group = renderGroup;

    if (jobs === null) {
        return preRenderedContent;
    }

    const existingGroups = new Set(jobs.map((job) => job.groups).flat());

    const renderedGroups = showEmptyGroups
        ? allGroups.union(existingGroups)
        : setIntersectionPreserve(allGroups, existingGroups).union(existingGroups);

    const groupsArr = Array.from(renderedGroups);
    if (sortAlphabetically) {
        groupsArr.sort();
    }

	return (
        <>
            {groupsArr.map((group, index) => (
                <Group key={group} value={group} index={index} />
            ))}
        </>
	);    
}

JobGroupsClientFn.displayName = 'JobGroupsClient';

export { JobGroupsClientFn as JobGroupsClient };
