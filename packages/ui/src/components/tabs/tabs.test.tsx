import type { ComponentProps } from 'react';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';

import { Tabs, TabsContent, TabsList, TabsTrigger } from './tabs';
import { defaultVariants, sizeClasses, TABS_SIZES, TABS_VARIANTS, variantClasses } from './tabs.variants';

type TestTabsProps = ComponentProps<typeof Tabs> & Pick<ComponentProps<typeof TabsList>, 'variant' | 'size'>;

/** Three tabs, the last one disabled, so every test can use the same markup. */
function TestTabs({ variant, size, ...props }: TestTabsProps) {
    return (
        <Tabs defaultValue="account" {...props}>
            <TabsList variant={variant} size={size}>
                <TabsTrigger value="account">Account</TabsTrigger>
                <TabsTrigger value="password">Password</TabsTrigger>
                <TabsTrigger value="billing" disabled>
                    Billing
                </TabsTrigger>
            </TabsList>
            <TabsContent value="account">Account panel</TabsContent>
            <TabsContent value="password">Password panel</TabsContent>
            <TabsContent value="billing">Billing panel</TabsContent>
        </Tabs>
    );
}

/** Class names with brackets are long, so tests pass them as a list. */
function classList(classes: string) {
    return classes.split(' ');
}

describe('Tabs', () => {
    describe('behavior', () => {
        it('shows the panel of the default tab only', () => {
            render(<TestTabs />);

            expect(screen.getByText('Account panel')).toBeInTheDocument();
            expect(screen.queryByText('Password panel')).not.toBeInTheDocument();
        });

        it('starts on the tab given by defaultValue', () => {
            render(<TestTabs defaultValue="password" />);

            expect(screen.getByText('Password panel')).toBeInTheDocument();
            expect(screen.queryByText('Account panel')).not.toBeInTheDocument();
        });

        it('shows another panel when its tab is clicked', async () => {
            const user = userEvent.setup();
            render(<TestTabs />);

            await user.click(screen.getByRole('tab', { name: 'Password' }));

            expect(screen.getByText('Password panel')).toBeInTheDocument();
            expect(screen.queryByText('Account panel')).not.toBeInTheDocument();
        });

        it('calls onValueChange with the value of the clicked tab', async () => {
            const user = userEvent.setup();
            const onValueChange = jest.fn();
            render(<TestTabs onValueChange={onValueChange} />);

            await user.click(screen.getByRole('tab', { name: 'Password' }));

            expect(onValueChange).toHaveBeenCalledWith('password');
        });

        it('does not select a disabled tab', async () => {
            const user = userEvent.setup();
            render(<TestTabs />);

            const billing = screen.getByRole('tab', { name: 'Billing' });
            await user.click(billing);

            expect(billing).toBeDisabled();
            expect(screen.getByText('Account panel')).toBeInTheDocument();
            expect(screen.queryByText('Billing panel')).not.toBeInTheDocument();
        });

        it('moves to the next tab with the right arrow key', async () => {
            const user = userEvent.setup();
            render(<TestTabs />);

            await user.tab();
            await user.keyboard('{ArrowRight}');

            expect(screen.getByRole('tab', { name: 'Password' })).toHaveFocus();
            expect(screen.getByText('Password panel')).toBeInTheDocument();
        });

        it('moves with the down arrow key and ignores the right arrow key when vertical', async () => {
            const user = userEvent.setup();
            render(<TestTabs orientation="vertical" />);

            await user.tab();
            await user.keyboard('{ArrowRight}');
            expect(screen.getByRole('tab', { name: 'Account' })).toHaveFocus();

            await user.keyboard('{ArrowDown}');
            expect(screen.getByRole('tab', { name: 'Password' })).toHaveFocus();
        });
    });

    describe('accessibility', () => {
        it('has the tablist, tab and tabpanel roles', () => {
            render(<TestTabs />);

            expect(screen.getByRole('tablist')).toBeInTheDocument();
            expect(screen.getAllByRole('tab')).toHaveLength(3);
            expect(screen.getByRole('tabpanel')).toBeInTheDocument();
        });

        it('marks the active tab as selected', async () => {
            const user = userEvent.setup();
            render(<TestTabs />);

            expect(screen.getByRole('tab', { name: 'Account' })).toHaveAttribute('aria-selected', 'true');
            expect(screen.getByRole('tab', { name: 'Password' })).toHaveAttribute('aria-selected', 'false');

            await user.click(screen.getByRole('tab', { name: 'Password' }));

            expect(screen.getByRole('tab', { name: 'Password' })).toHaveAttribute('aria-selected', 'true');
            expect(screen.getByRole('tab', { name: 'Account' })).toHaveAttribute('aria-selected', 'false');
        });

        it('names the panel after its tab', () => {
            render(<TestTabs />);

            expect(screen.getByRole('tabpanel', { name: 'Account' })).toHaveTextContent('Account panel');
        });

        it('can reach the panel with the keyboard', () => {
            render(<TestTabs />);

            expect(screen.getByRole('tabpanel')).toHaveAttribute('tabindex', '0');
        });

        it('tells assistive technology the orientation of the tab list', () => {
            const { rerender } = render(<TestTabs />);
            expect(screen.getByRole('tablist')).toHaveAttribute('aria-orientation', 'horizontal');

            rerender(<TestTabs orientation="vertical" />);
            expect(screen.getByRole('tablist')).toHaveAttribute('aria-orientation', 'vertical');
        });

        it.each(TABS_VARIANTS)('has no axe violations with variant "%s"', async variant => {
            const { container } = render(<TestTabs variant={variant} />);

            expect(await axe(container)).toHaveNoViolations();
        });

        it('has no axe violations when vertical', async () => {
            const { container } = render(<TestTabs orientation="vertical" />);

            expect(await axe(container)).toHaveNoViolations();
        });
    });

    describe('variant', () => {
        it('uses the default variant by default', () => {
            render(<TestTabs />);

            const list = screen.getByRole('tablist');
            expect(defaultVariants.variant).toBe('default');
            expect(list).toHaveAttribute('data-variant', 'default');
            expect(list).toHaveClass('bg-muted', 'p-1');
        });

        it.each(TABS_VARIANTS)('applies variant "%s"', variant => {
            render(<TestTabs variant={variant} />);

            const list = screen.getByRole('tablist');
            expect(list).toHaveAttribute('data-variant', variant);
            expect(list).toHaveClass(...classList(variantClasses[variant]));
        });

        it('has no background and a gap between the tabs for the line variant', () => {
            render(<TestTabs variant="line" />);

            const list = screen.getByRole('tablist');
            expect(list).toHaveClass('gap-1', 'bg-transparent');
            expect(list).not.toHaveClass('bg-muted');
        });

        it('lifts the active tab like a card in the default variant', () => {
            render(<TestTabs />);

            expect(screen.getByRole('tab', { name: 'Account' })).toHaveClass(
                'group-data-[variant=default]/tabs-list:data-[state=active]:bg-card',
                'group-data-[variant=default]/tabs-list:data-[state=active]:shadow-sm',
            );
        });

        it('shows a line under the active tab in the line variant', () => {
            render(<TestTabs variant="line" />);

            expect(screen.getByRole('tab', { name: 'Account' })).toHaveClass(
                'after:absolute',
                'after:opacity-0',
                'group-data-[variant=line]/tabs-list:data-[state=active]:after:opacity-100',
            );
        });
    });

    describe('size', () => {
        it('uses the md size by default', () => {
            render(<TestTabs />);

            const list = screen.getByRole('tablist');
            expect(defaultVariants.size).toBe('md');
            expect(list).toHaveAttribute('data-size', 'md');
            expect(list).toHaveClass('text-base', '[--tabs-trigger-height:--spacing(10)]');
        });

        it.each(TABS_SIZES)('applies size "%s"', size => {
            render(<TestTabs size={size} />);

            const list = screen.getByRole('tablist');
            expect(list).toHaveAttribute('data-size', size);
            expect(list).toHaveClass(...classList(sizeClasses[size]));
        });

        it.each([
            ['sm', 'text-sm', '[--tabs-trigger-height:--spacing(8)]'],
            ['md', 'text-base', '[--tabs-trigger-height:--spacing(10)]'],
            ['lg', 'text-lg', '[--tabs-trigger-height:--spacing(12)]'],
            ['xl', 'text-xl', '[--tabs-trigger-height:--spacing(14)]'],
        ] as const)('maps size "%s" to %s and a tab height', (size, textClass, heightClass) => {
            render(<TestTabs size={size} />);

            expect(screen.getByRole('tablist')).toHaveClass(textClass, heightClass);
        });

        it('sets the height of every tab from the size', () => {
            render(<TestTabs />);

            screen.getAllByRole('tab').forEach(tab => {
                expect(tab).toHaveClass('h-(--tabs-trigger-height)');
            });
        });
    });

    describe('orientation', () => {
        it('is horizontal by default and shares the width between the tabs', () => {
            render(<TestTabs data-testid="tabs" />);

            expect(screen.getByTestId('tabs')).toHaveAttribute('data-orientation', 'horizontal');
            expect(screen.getByTestId('tabs')).toHaveClass('data-[orientation=horizontal]:flex-col');
            expect(screen.getByRole('tab', { name: 'Account' })).toHaveClass('flex-1');
        });

        it('can be vertical', () => {
            render(<TestTabs data-testid="tabs" orientation="vertical" />);

            expect(screen.getByTestId('tabs')).toHaveAttribute('data-orientation', 'vertical');
        });

        it('stacks the tabs and makes them full width when vertical', () => {
            render(<TestTabs orientation="vertical" />);

            expect(screen.getByRole('tablist')).toHaveClass(
                'group-data-[orientation=vertical]/tabs:h-fit',
                'group-data-[orientation=vertical]/tabs:flex-col',
            );
            expect(screen.getByRole('tab', { name: 'Account' })).toHaveClass(
                'group-data-[orientation=vertical]/tabs:w-full',
                'group-data-[orientation=vertical]/tabs:justify-start',
            );
        });

        it('keeps the height of a tab when vertical by not letting it grow or shrink', () => {
            render(<TestTabs orientation="vertical" />);

            expect(screen.getByRole('tab', { name: 'Account' })).toHaveClass(
                'h-(--tabs-trigger-height)',
                'group-data-[orientation=vertical]/tabs:flex-none',
            );
        });
    });

    describe('customization', () => {
        it('sets data-slot on every part', () => {
            render(<TestTabs data-testid="tabs" />);

            expect(screen.getByTestId('tabs')).toHaveAttribute('data-slot', 'tabs');
            expect(screen.getByRole('tablist')).toHaveAttribute('data-slot', 'tabs-list');
            expect(screen.getByRole('tab', { name: 'Account' })).toHaveAttribute('data-slot', 'tabs-trigger');
            expect(screen.getByRole('tabpanel')).toHaveAttribute('data-slot', 'tabs-content');
        });

        it('shows a pointer cursor on the tabs', () => {
            render(<TestTabs />);

            expect(screen.getByRole('tab', { name: 'Account' })).toHaveClass('cursor-pointer');
        });

        it('has rounded-md corners on the list and the tabs', () => {
            render(<TestTabs />);

            expect(screen.getByRole('tablist')).toHaveClass('rounded-md');
            expect(screen.getByRole('tab', { name: 'Account' })).toHaveClass('rounded-md');
        });

        it('keeps a visible focus outline on the tabs and the panel', () => {
            render(<TestTabs />);

            const focusClasses = [
                'focus-visible:outline-2',
                'focus-visible:outline-offset-2',
                'focus-visible:outline-ring',
            ];
            expect(screen.getByRole('tab', { name: 'Account' })).toHaveClass(...focusClasses);
            expect(screen.getByRole('tabpanel')).toHaveClass(...focusClasses);
        });

        it('marks the active tab with data-state', async () => {
            const user = userEvent.setup();
            render(<TestTabs />);

            expect(screen.getByRole('tab', { name: 'Account' })).toHaveAttribute('data-state', 'active');
            expect(screen.getByRole('tab', { name: 'Password' })).toHaveAttribute('data-state', 'inactive');

            await user.click(screen.getByRole('tab', { name: 'Password' }));

            expect(screen.getByRole('tab', { name: 'Password' })).toHaveAttribute('data-state', 'active');
        });

        it('merges a custom className on every part', () => {
            render(
                <Tabs defaultValue="one" className="custom-root">
                    <TabsList className="custom-list">
                        <TabsTrigger value="one" className="custom-trigger">
                            One
                        </TabsTrigger>
                    </TabsList>
                    <TabsContent value="one" className="custom-content">
                        Panel
                    </TabsContent>
                </Tabs>,
            );

            expect(screen.getByRole('tablist').parentElement).toHaveClass('custom-root');
            expect(screen.getByRole('tablist')).toHaveClass('custom-list');
            expect(screen.getByRole('tab')).toHaveClass('custom-trigger');
            expect(screen.getByRole('tabpanel')).toHaveClass('custom-content');
        });

        it('lets a custom className override the radius of the list', () => {
            render(
                <Tabs defaultValue="one">
                    <TabsList className="rounded-none">
                        <TabsTrigger value="one">One</TabsTrigger>
                    </TabsList>
                </Tabs>,
            );

            const list = screen.getByRole('tablist');
            expect(list).toHaveClass('rounded-none');
            expect(list).not.toHaveClass('rounded-md');
        });

        it('lets a custom className override the padding and the cursor of a tab', () => {
            render(
                <Tabs defaultValue="one">
                    <TabsList>
                        <TabsTrigger value="one" className="cursor-default px-8">
                            One
                        </TabsTrigger>
                    </TabsList>
                </Tabs>,
            );

            const tab = screen.getByRole('tab');
            expect(tab).toHaveClass('cursor-default', 'px-8');
            expect(tab).not.toHaveClass('cursor-pointer');
            expect(tab).not.toHaveClass('px-4');
        });
    });
});
