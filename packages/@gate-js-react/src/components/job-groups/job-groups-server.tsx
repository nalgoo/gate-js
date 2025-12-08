import type { JobGroupsBaseProps } from '../../types/types';
import { setIntersectionPreserve } from '../../utils/setIntersectionPreserve';
import { getServerContext } from '../jobs/jobs-server-context';

async function JobGroupsServerFn({
    renderGroup,
    showEmptyGroups,
    sortAlphabetically,
}: JobGroupsBaseProps) {
    const { jobs, groups: allGroups } = await getServerContext();

    const Group = renderGroup;

    const existingGroups = new Set(jobs.map((job) => job.groups).flat());

    const renderedGroups = showEmptyGroups
        ? allGroups.union(existingGroups)
        : setIntersectionPreserve(allGroups, existingGroups).union(existingGroups);

    const groupsArr = Array.from(renderedGroups);
    if (sortAlphabetically) {
        groupsArr.sort();
    }

    return groupsArr.map((group, idx) => (
        <Group
            key={group}
            value={group}
            index={idx}
        />
    ));
}

JobGroupsServerFn.displayName = 'JobGroupsServer';

export { JobGroupsServerFn as JobGroupsServer };
