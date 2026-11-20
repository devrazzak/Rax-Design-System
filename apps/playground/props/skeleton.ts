import type { PropDef } from '@/types/docs';

export const skeletonProps = [
    {
        name: 'className',
        type: 'string',
        description:
            'Sets the size and shape, for example h-4 w-full, or size-12 rounded-full for a circle. Skeleton has no size of its own.',
    },
] as const satisfies readonly PropDef[];
