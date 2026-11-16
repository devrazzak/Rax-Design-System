import type { Meta, StoryObj } from '@storybook/react-vite';

import { Button } from '@/components/button/button';

import type { AlertDialogContentProps } from './alert-dialog';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from './alert-dialog';
import { ALERT_DIALOG_SIZES } from './alert-dialog.variants';

type AlertDialogDemoProps = Pick<AlertDialogContentProps, 'size'> & {
    triggerLabel?: string;
    destructive?: boolean;
};

/** AlertDialog is a set of parts, so the stories use one small demo to show its props together. */
function AlertDialogDemo({ size, triggerLabel = 'Open alert dialog', destructive = false }: AlertDialogDemoProps) {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant={destructive ? 'destructive' : 'outline'}>{triggerLabel}</Button>
            </AlertDialogTrigger>
            <AlertDialogContent size={size}>
                <AlertDialogHeader>
                    <AlertDialogTitle>{destructive ? 'Delete this user?' : 'Discard changes?'}</AlertDialogTitle>
                    <AlertDialogDescription>
                        {destructive
                            ? 'This action cannot be undone. The user and all of their data will be removed.'
                            : 'You have unsaved changes. If you leave now, they will be lost.'}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction variant={destructive ? 'destructive' : undefined}>
                        {destructive ? 'Delete' : 'Discard'}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}

const meta = {
    title: 'Components/AlertDialog',
    component: AlertDialogDemo,
    tags: ['autodocs'],
    argTypes: {
        size: { control: 'inline-radio', options: ALERT_DIALOG_SIZES },
        destructive: { control: 'boolean' },
    },
} satisfies Meta<typeof AlertDialogDemo>;

export default meta;
type Story = StoryObj<typeof meta>;

/* stories */
export const Default: Story = {};

/** Use the destructive variant on the action when it deletes something. */
export const Destructive: Story = {
    args: { destructive: true },
};

export const Sizes: Story = {
    render: args => (
        <div className="flex flex-wrap gap-3">
            {ALERT_DIALOG_SIZES.map(size => (
                <AlertDialogDemo key={size} {...args} size={size} triggerLabel={`Open ${size}`} />
            ))}
        </div>
    ),
};
