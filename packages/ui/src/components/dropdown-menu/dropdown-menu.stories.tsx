import type { ReactNode } from 'react';
import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react-vite';
import { EyeIcon, SearchIcon, XIcon } from '@/icons';

import { Button } from '@/components/button/button';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/dialog/dialog';

import type { DropdownMenuContentProps } from './dropdown-menu';
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from './dropdown-menu';
import { DROPDOWN_MENU_SIZES, DROPDOWN_MENU_VARIANTS } from './dropdown-menu.variants';

/** A button that opens the menu, so the stories only write the items. */
function DemoMenu({
    children,
    label = 'Open menu',
    size,
}: {
    children: ReactNode;
    label?: string;
    size?: DropdownMenuContentProps['size'];
}) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="focus-visible:border-ring focus-visible:ring-0">
                    {label}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent size={size}>{children}</DropdownMenuContent>
        </DropdownMenu>
    );
}

/** Keeps the checked columns in state, so the story can show them toggling. */
function ColumnsMenu() {
    const [showEmail, setShowEmail] = useState(true);
    const [showRole, setShowRole] = useState(false);

    return (
        <DemoMenu label="Columns">
            <DropdownMenuLabel>Show columns</DropdownMenuLabel>
            <DropdownMenuCheckboxItem checked={showEmail} onCheckedChange={setShowEmail}>
                Email
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem checked={showRole} onCheckedChange={setShowRole}>
                Role
            </DropdownMenuCheckboxItem>
        </DemoMenu>
    );
}

/** Keeps the chosen sort order in state, so the story can show one item checked at a time. */
function SortMenu() {
    const [sort, setSort] = useState('newest');

    return (
        <DemoMenu label="Sort by">
            <DropdownMenuRadioGroup value={sort} onValueChange={setSort}>
                <DropdownMenuRadioItem value="newest">Newest</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="oldest">Oldest</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="name">Name</DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
        </DemoMenu>
    );
}

/** The dialog lives next to the menu, not inside it, because the menu removes its content when it closes. */
function RowActionsMenu() {
    const [deleteOpen, setDeleteOpen] = useState(false);

    return (
        <>
            {/* modal={false} keeps the menu from locking the page while the dialog opens */}
            <DropdownMenu modal={false}>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="ghost"
                        aria-label="Row actions"
                        className="focus-visible:border-ring focus-visible:ring-0"
                    >
                        ⋯
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuItem>Edit</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem variant="destructive" onSelect={() => setDeleteOpen(true)}>
                        Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
                <DialogContent size="sm" showCloseButton={false}>
                    <DialogHeader>
                        <DialogTitle>Delete this user?</DialogTitle>
                        <DialogDescription>This cannot be undone. The user loses access right away.</DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <DialogClose asChild>
                            <Button variant="destructive">Delete</Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}

const meta = {
    title: 'Components/DropdownMenu',
    component: DropdownMenuItem,
    tags: ['autodocs'],
    argTypes: {
        variant: { control: 'inline-radio', options: DROPDOWN_MENU_VARIANTS },
        disabled: { control: 'boolean' },
    },
} satisfies Meta<typeof DropdownMenuItem>;

export default meta;
type Story = StoryObj<typeof meta>;

/* stories */
export const Default: Story = {
    render: args => (
        <DemoMenu size="sm">
            <DropdownMenuLabel>My account</DropdownMenuLabel>
            <DropdownMenuItem {...args}>Profile</DropdownMenuItem>
            <DropdownMenuItem {...args}>Settings</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem {...args}>Log out</DropdownMenuItem>
        </DemoMenu>
    ),
};

export const Variants: Story = {
    render: args => (
        <DemoMenu>
            {DROPDOWN_MENU_VARIANTS.map(variant => (
                <DropdownMenuItem key={variant} {...args} variant={variant}>
                    {variant}
                </DropdownMenuItem>
            ))}
        </DemoMenu>
    ),
};

export const Sizes: Story = {
    render: () => (
        <div className="flex flex-wrap gap-3">
            {DROPDOWN_MENU_SIZES.map(size => (
                <DemoMenu key={size} size={size} label={`Open ${size}`}>
                    <DropdownMenuLabel>My account</DropdownMenuLabel>
                    <DropdownMenuItem>
                        <EyeIcon />
                        Profile
                    </DropdownMenuItem>
                    <DropdownMenuCheckboxItem checked>Notifications</DropdownMenuCheckboxItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem variant="destructive">Log out</DropdownMenuItem>
                </DemoMenu>
            ))}
        </div>
    ),
};

export const WithGroups: Story = {
    render: () => (
        <DemoMenu>
            <DropdownMenuGroup>
                <DropdownMenuLabel>Account</DropdownMenuLabel>
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Billing</DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
                <DropdownMenuLabel>Team</DropdownMenuLabel>
                <DropdownMenuItem>Invite members</DropdownMenuItem>
                <DropdownMenuItem>New team</DropdownMenuItem>
            </DropdownMenuGroup>
        </DemoMenu>
    ),
};

export const WithIcons: Story = {
    render: () => (
        <DemoMenu>
            <DropdownMenuItem>
                <SearchIcon />
                Search
            </DropdownMenuItem>
            <DropdownMenuItem>
                <EyeIcon />
                View
            </DropdownMenuItem>
            <DropdownMenuItem variant="destructive">
                <XIcon />
                Remove
            </DropdownMenuItem>
        </DemoMenu>
    ),
};

export const DisabledItem: Story = {
    render: () => (
        <DemoMenu>
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuItem disabled>Duplicate</DropdownMenuItem>
            <DropdownMenuItem variant="destructive" disabled>
                Delete
            </DropdownMenuItem>
        </DemoMenu>
    ),
};

export const CheckboxItems: Story = {
    render: () => <ColumnsMenu />,
};

export const RadioItems: Story = {
    render: () => <SortMenu />,
};

export const OpensDialog: Story = {
    render: () => <RowActionsMenu />,
};
