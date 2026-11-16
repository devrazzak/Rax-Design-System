import type { Meta, StoryObj } from '@storybook/react-vite';

import { Button } from '@/components/button/button';
import { Field, FieldLabel } from '@/components/field/field';
import { Input } from '@/components/input/input';

import type { DrawerContentProps } from './drawer';
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from './drawer';
import { DRAWER_SIDES, DRAWER_SIZES } from './drawer.variants';

type DrawerDemoProps = Pick<DrawerContentProps, 'side' | 'size' | 'showCloseButton' | 'closeOnOutsideClick'> & {
    triggerLabel?: string;
    withFooter?: boolean;
};

/** Drawer is a set of parts, so the stories use one small demo to show its props together. */
function DrawerDemo({
    side,
    size,
    showCloseButton,
    closeOnOutsideClick,
    triggerLabel = 'Open drawer',
    withFooter = false,
}: DrawerDemoProps) {
    return (
        <Drawer>
            <DrawerTrigger asChild>
                <Button variant="outline">{triggerLabel}</Button>
            </DrawerTrigger>
            <DrawerContent
                side={side}
                size={size}
                showCloseButton={showCloseButton}
                closeOnOutsideClick={closeOnOutsideClick}
            >
                <DrawerHeader>
                    <DrawerTitle>Edit profile</DrawerTitle>
                    <DrawerDescription>
                        Make changes to your profile here. Click save when you are done.
                    </DrawerDescription>
                </DrawerHeader>
                {withFooter && (
                    <DrawerFooter>
                        <DrawerClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DrawerClose>
                    </DrawerFooter>
                )}
            </DrawerContent>
        </Drawer>
    );
}

/** Twenty short paragraphs, enough to be taller than the screen. */
function LongText() {
    return Array.from({ length: 20 }, (_, index) => (
        <p key={index} className="text-sm text-muted-foreground">
            Paragraph {index + 1}. Terms and conditions text that is long enough to need scrolling inside the drawer.
        </p>
    ));
}

const meta = {
    title: 'Components/Drawer',
    component: DrawerDemo,
    tags: ['autodocs'],
    argTypes: {
        side: { control: 'inline-radio', options: DRAWER_SIDES },
        size: { control: 'inline-radio', options: DRAWER_SIZES },
        showCloseButton: { control: 'boolean' },
        closeOnOutsideClick: { control: 'boolean' },
        withFooter: { control: 'boolean' },
    },
} satisfies Meta<typeof DrawerDemo>;

export default meta;
type Story = StoryObj<typeof meta>;

/* stories */
export const Default: Story = {};

export const Sides: Story = {
    render: args => (
        <div className="flex flex-wrap gap-3">
            {DRAWER_SIDES.map(side => (
                <DrawerDemo key={side} {...args} side={side} triggerLabel={`Open ${side}`} />
            ))}
        </div>
    ),
};

/** Size sets the width of a left or right drawer. */
export const Sizes: Story = {
    render: args => (
        <div className="flex flex-wrap gap-3">
            {DRAWER_SIZES.map(size => (
                <DrawerDemo key={size} {...args} size={size} triggerLabel={`Open ${size}`} />
            ))}
        </div>
    ),
};

export const WithFooter: Story = {
    args: { withFooter: true },
};

export const WithoutCloseButton: Story = {
    args: { showCloseButton: false },
};

/** Clicking outside does not close the drawer, so a half-filled form is not lost. Esc and the close button still work. */
export const KeepOpenOnOutsideClick: Story = {
    args: { closeOnOutsideClick: false, withFooter: true },
};

/** Header and footer stay in view, only the middle part scrolls. */
export const ScrollableBody: Story = {
    render: () => (
        <Drawer>
            <DrawerTrigger asChild>
                <Button variant="outline">Open drawer</Button>
            </DrawerTrigger>
            <DrawerContent>
                <DrawerHeader>
                    <DrawerTitle>Terms and conditions</DrawerTitle>
                    <DrawerDescription>Scroll to the end to read everything.</DrawerDescription>
                </DrawerHeader>
                <div className="flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto px-4">
                    <LongText />
                </div>
                <DrawerFooter>
                    <DrawerClose asChild>
                        <Button>Accept</Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    ),
};

export const WithForm: Story = {
    render: () => (
        <Drawer>
            <DrawerTrigger asChild>
                <Button variant="outline">Add user</Button>
            </DrawerTrigger>
            <DrawerContent>
                <DrawerHeader>
                    <DrawerTitle>Add user</DrawerTitle>
                    <DrawerDescription>Enter the details of the new user.</DrawerDescription>
                </DrawerHeader>
                <div className="flex flex-col gap-4 px-4">
                    <Field>
                        <FieldLabel htmlFor="drawer-name">Name</FieldLabel>
                        <Input id="drawer-name" />
                    </Field>
                    <Field>
                        <FieldLabel htmlFor="drawer-email">Email</FieldLabel>
                        <Input id="drawer-email" type="email" />
                    </Field>
                </div>
                <DrawerFooter>
                    <DrawerClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DrawerClose>
                    <Button>Save</Button>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    ),
};
