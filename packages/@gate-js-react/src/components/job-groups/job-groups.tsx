import type { ElementType, Ref } from 'react';
import type { JobGroupsBaseProps, NativeElementProps } from '../../types/types';
import { isServer } from '../../utils/isServer';
import { forwardRefWithAs, render } from '../../utils/render';
import { JobGroupsClient } from './job-groups-client';
import { JobGroupsServer } from './job-groups-server';

const DEFAULT_TAG = 'div' as const;

export type JobGroupsProps<T extends ElementType> =
	NativeElementProps<T>
	& JobGroupsBaseProps;

function JobGroupsFn<TTag extends ElementType = typeof DEFAULT_TAG>({
    renderGroup,
    ...theirProps
}: JobGroupsProps<TTag>, ref: Ref<HTMLElement>) {
    const children = (
        <JobGroupsClient
            renderGroup={renderGroup}
            preRenderedContent={
                isServer()
                    // @ts-expect-error Dunno why, should be okay in newer React
                    ? <JobGroupsServer renderGroup={renderGroup} />
                    : undefined
            }
        />
    );

    const ourProps = {
        ref,
        children,
    };

    return render({
        ourProps,
        theirProps,
        slot: {}, // slot,
        defaultTag: DEFAULT_TAG,
        name: 'JobGroups',
    });
}

JobGroupsFn.displayName = 'JobGroups';

export const JobGroups = forwardRefWithAs(JobGroupsFn);
