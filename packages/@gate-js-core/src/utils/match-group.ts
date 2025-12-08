import type { GroupIndexType, JobListItemWithGroupType } from "../types";

export function matchGroup(job: JobListItemWithGroupType, group: GroupIndexType | undefined): boolean {
    if (typeof group === 'undefined') {
        return true;
    }

    if (group === null) {
        return job.groups.length === 0;
    }

    return job.groups.includes(group);
}
