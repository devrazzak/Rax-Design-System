import type { ComponentProps } from 'react';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';

import { sizeClasses, TOGGLE_SIZES, TOGGLE_VARIANTS, variantClasses } from '@/components/toggle/toggle.variants';

import { ToggleGroup, ToggleGroupItem } from './toggle-group';

type TestGroupProps = ComponentProps<typeof ToggleGroup>;

/** Three items inside one group. The `type` comes from the props, because Radix needs it. */
function TestGroup(props: TestGroupProps) {
    return (
        <ToggleGroup aria-label="Text format" {...props}>
            <ToggleGroupItem value="bold">Bold</ToggleGroupItem>
            <ToggleGroupItem value="italic">Italic</ToggleGroupItem>
            <ToggleGroupItem value="underline">Underline</ToggleGroupItem>
        </ToggleGroup>
    );
}

/** Class names with brackets are long, so tests pass them as a list. */
function classList(classes: string) {
    return classes.split(' ');
}

describe('ToggleGroup', () => {
    describe('multiple', () => {
        it('turns several items on at the same time', async () => {
            const user = userEvent.setup();
            render(<TestGroup type="multiple" />);

            await user.click(screen.getByRole('button', { name: 'Bold' }));
            await user.click(screen.getByRole('button', { name: 'Italic' }));

            expect(screen.getByRole('button', { name: 'Bold' })).toHaveAttribute('aria-pressed', 'true');
            expect(screen.getByRole('button', { name: 'Italic' })).toHaveAttribute('aria-pressed', 'true');
            expect(screen.getByRole('button', { name: 'Underline' })).toHaveAttribute('aria-pressed', 'false');
        });

        it('turns an item off when it is pressed again', async () => {
            const user = userEvent.setup();
            render(<TestGroup type="multiple" defaultValue={['bold']} />);

            await user.click(screen.getByRole('button', { name: 'Bold' }));

            expect(screen.getByRole('button', { name: 'Bold' })).toHaveAttribute('aria-pressed', 'false');
        });

        it('calls onValueChange with the list of values', async () => {
            const user = userEvent.setup();
            const onValueChange = jest.fn();
            render(<TestGroup type="multiple" onValueChange={onValueChange} />);

            await user.click(screen.getByRole('button', { name: 'Bold' }));
            await user.click(screen.getByRole('button', { name: 'Italic' }));

            expect(onValueChange).toHaveBeenLastCalledWith(['bold', 'italic']);
        });
    });

    describe('single', () => {
        it('keeps only one item on', async () => {
            const user = userEvent.setup();
            render(<TestGroup type="single" />);

            await user.click(screen.getByRole('radio', { name: 'Bold' }));
            await user.click(screen.getByRole('radio', { name: 'Italic' }));

            expect(screen.getByRole('radio', { name: 'Bold' })).toHaveAttribute('aria-checked', 'false');
            expect(screen.getByRole('radio', { name: 'Italic' })).toHaveAttribute('aria-checked', 'true');
        });

        it('starts with the default value on', () => {
            render(<TestGroup type="single" defaultValue="italic" />);

            expect(screen.getByRole('radio', { name: 'Italic' })).toHaveAttribute('data-state', 'on');
        });

        it('calls onValueChange with an empty string when the active item is pressed again', async () => {
            const user = userEvent.setup();
            const onValueChange = jest.fn();
            render(<TestGroup type="single" defaultValue="bold" onValueChange={onValueChange} />);

            await user.click(screen.getByRole('radio', { name: 'Bold' }));

            expect(onValueChange).toHaveBeenCalledWith('');
        });

        it('follows the value when it is controlled', async () => {
            const user = userEvent.setup();
            render(<TestGroup type="single" value="bold" />);

            await user.click(screen.getByRole('radio', { name: 'Italic' }));

            expect(screen.getByRole('radio', { name: 'Bold' })).toHaveAttribute('data-state', 'on');
            expect(screen.getByRole('radio', { name: 'Italic' })).toHaveAttribute('data-state', 'off');
        });
    });

    describe('variant and size', () => {
        it('has the data-slot attributes', () => {
            render(<TestGroup type="multiple" />);

            expect(screen.getByRole('toolbar')).toHaveAttribute('data-slot', 'toggle-group');
            expect(screen.getByRole('button', { name: 'Bold' })).toHaveAttribute('data-slot', 'toggle-group-item');
        });

        it('uses the Toggle defaults when nothing is set', () => {
            render(<TestGroup type="multiple" />);

            const group = screen.getByRole('toolbar');
            expect(group).toHaveAttribute('data-variant', 'default');
            expect(group).toHaveAttribute('data-size', 'md');
            expect(group).toHaveAttribute('data-spacing', 'default');
            expect(group).toHaveAttribute('data-orientation', 'horizontal');
        });

        it.each(TOGGLE_VARIANTS)('gives every item the %s variant classes', variant => {
            render(<TestGroup type="multiple" variant={variant} />);

            screen.getAllByRole('button').forEach(item => {
                expect(item).toHaveAttribute('data-variant', variant);
                expect(item).toHaveClass(...classList(variantClasses[variant]));
            });
        });

        it.each(TOGGLE_SIZES)('gives every item the %s size classes', size => {
            render(<TestGroup type="multiple" size={size} />);

            screen.getAllByRole('button').forEach(item => {
                expect(item).toHaveAttribute('data-size', size);
                expect(item).toHaveClass(...classList(sizeClasses[size]));
            });
        });
    });

    describe('layout', () => {
        it('has a gap between the items by default', () => {
            render(<TestGroup type="multiple" />);

            expect(screen.getByRole('toolbar')).toHaveClass('flex', 'gap-2');
        });

        it('removes the gap and the inner rounding with spacing none', () => {
            render(<TestGroup type="multiple" spacing="none" />);

            expect(screen.getByRole('toolbar')).toHaveAttribute('data-spacing', 'none');
            expect(screen.getByRole('toolbar')).toHaveClass('data-[spacing=none]:gap-0');
            expect(screen.getByRole('button', { name: 'Italic' })).toHaveClass(
                'group-data-[spacing=none]/toggle-group:rounded-none',
            );
        });

        it('sets the orientation on the group', () => {
            render(<TestGroup type="multiple" orientation="vertical" />);

            expect(screen.getByRole('toolbar')).toHaveAttribute('data-orientation', 'vertical');
            expect(screen.getByRole('toolbar')).toHaveClass('data-[orientation=vertical]:flex-col');
        });

        it('merges a custom className on the group and an item', () => {
            render(
                <ToggleGroup type="multiple" aria-label="Text format" className="group-extra">
                    <ToggleGroupItem value="bold" className="item-extra">
                        Bold
                    </ToggleGroupItem>
                </ToggleGroup>,
            );

            expect(screen.getByRole('toolbar')).toHaveClass('group-extra', 'flex');
            expect(screen.getByRole('button', { name: 'Bold' })).toHaveClass('item-extra', 'inline-flex');
        });
    });

    describe('keyboard', () => {
        it('moves focus between items with the arrow keys', async () => {
            const user = userEvent.setup();
            render(<TestGroup type="multiple" />);

            await user.tab();
            expect(screen.getByRole('button', { name: 'Bold' })).toHaveFocus();

            await user.keyboard('{ArrowRight}');
            expect(screen.getByRole('button', { name: 'Italic' })).toHaveFocus();
        });

        it('uses the up and down arrow keys when it is vertical', async () => {
            const user = userEvent.setup();
            render(<TestGroup type="multiple" orientation="vertical" />);

            await user.tab();
            await user.keyboard('{ArrowDown}');

            expect(screen.getByRole('button', { name: 'Italic' })).toHaveFocus();
        });

        it('toggles the focused item with Space', async () => {
            const user = userEvent.setup();
            render(<TestGroup type="multiple" />);

            await user.tab();
            await user.keyboard(' ');

            expect(screen.getByRole('button', { name: 'Bold' })).toHaveAttribute('aria-pressed', 'true');
        });
    });

    describe('disabled', () => {
        it('disables every item when the group is disabled', async () => {
            const user = userEvent.setup();
            const onValueChange = jest.fn();
            render(<TestGroup type="multiple" disabled onValueChange={onValueChange} />);

            await user.click(screen.getByRole('button', { name: 'Bold' }));

            screen.getAllByRole('button').forEach(item => expect(item).toBeDisabled());
            expect(onValueChange).not.toHaveBeenCalled();
        });

        it('disables only one item', () => {
            render(
                <ToggleGroup type="multiple" aria-label="Text format">
                    <ToggleGroupItem value="bold">Bold</ToggleGroupItem>
                    <ToggleGroupItem value="italic" disabled>
                        Italic
                    </ToggleGroupItem>
                </ToggleGroup>,
            );

            expect(screen.getByRole('button', { name: 'Bold' })).toBeEnabled();
            expect(screen.getByRole('button', { name: 'Italic' })).toBeDisabled();
        });
    });

    describe('accessibility', () => {
        it('has the toolbar role and a name', () => {
            render(<TestGroup type="multiple" />);

            expect(screen.getByRole('toolbar', { name: 'Text format' })).toBeInTheDocument();
        });

        it('has no axe violations when multiple', async () => {
            const { container } = render(<TestGroup type="multiple" defaultValue={['bold']} />);

            expect(await axe(container)).toHaveNoViolations();
        });

        it('has no axe violations when single', async () => {
            const { container } = render(<TestGroup type="single" defaultValue="bold" />);

            expect(await axe(container)).toHaveNoViolations();
        });
    });
});
