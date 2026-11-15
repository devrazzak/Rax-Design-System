import { useState } from 'react';

import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';

import { Label } from '@/components/label/label';

import { RadioGroup, RadioGroupItem } from './radio-group';
import { defaultSize, RADIO_GROUP_SIZES, sizeClasses } from './radio-group.variants';

function PlanGroup(props: React.ComponentProps<typeof RadioGroup>) {
    return (
        <RadioGroup aria-label="Plan" {...props}>
            <RadioGroupItem value="free" aria-label="Free" />
            <RadioGroupItem value="pro" aria-label="Pro" />
            <RadioGroupItem value="enterprise" aria-label="Enterprise" />
        </RadioGroup>
    );
}

function ControlledGroup() {
    const [value, setValue] = useState('free');
    return (
        <>
            <PlanGroup value={value} onValueChange={setValue} />
            <button type="button" onClick={() => setValue('enterprise')}>
                Choose enterprise
            </button>
        </>
    );
}

describe('RadioGroup', () => {
    describe('behavior', () => {
        it('has nothing selected without a default value', () => {
            render(<PlanGroup />);

            screen.getAllByRole('radio').forEach(radio => {
                expect(radio).not.toBeChecked();
            });
        });

        it('selects the default value', () => {
            render(<PlanGroup defaultValue="pro" />);

            expect(screen.getByRole('radio', { name: 'Pro' })).toBeChecked();
            expect(screen.getByRole('radio', { name: 'Free' })).not.toBeChecked();
        });

        it('selects one item at a time on click', async () => {
            const user = userEvent.setup();
            render(<PlanGroup defaultValue="free" />);

            await user.click(screen.getByRole('radio', { name: 'Pro' }));

            expect(screen.getByRole('radio', { name: 'Pro' })).toBeChecked();
            expect(screen.getByRole('radio', { name: 'Free' })).not.toBeChecked();
        });

        it('reports the selected value through onValueChange', async () => {
            const user = userEvent.setup();
            const onValueChange = jest.fn();
            render(<PlanGroup onValueChange={onValueChange} />);

            await user.click(screen.getByRole('radio', { name: 'Pro' }));
            await user.click(screen.getByRole('radio', { name: 'Enterprise' }));

            expect(onValueChange).toHaveBeenNthCalledWith(1, 'pro');
            expect(onValueChange).toHaveBeenNthCalledWith(2, 'enterprise');
        });

        it('keeps the selection when the selected item is clicked again', async () => {
            const user = userEvent.setup();
            render(<PlanGroup defaultValue="pro" />);

            await user.click(screen.getByRole('radio', { name: 'Pro' }));

            expect(screen.getByRole('radio', { name: 'Pro' })).toBeChecked();
        });

        it('follows a controlled value', async () => {
            const user = userEvent.setup();
            render(<ControlledGroup />);

            expect(screen.getByRole('radio', { name: 'Free' })).toBeChecked();

            await user.click(screen.getByRole('button', { name: 'Choose enterprise' }));
            expect(screen.getByRole('radio', { name: 'Enterprise' })).toBeChecked();

            await user.click(screen.getByRole('radio', { name: 'Pro' }));
            expect(screen.getByRole('radio', { name: 'Pro' })).toBeChecked();
        });

        it('selects an item when its label is clicked', async () => {
            const user = userEvent.setup();
            render(
                <RadioGroup aria-label="Plan">
                    <RadioGroupItem id="plan-pro" value="pro" />
                    <Label htmlFor="plan-pro">Pro plan</Label>
                </RadioGroup>,
            );

            await user.click(screen.getByText('Pro plan'));

            expect(screen.getByRole('radio', { name: 'Pro plan' })).toBeChecked();
        });
    });

    describe('keyboard', () => {
        it('moves the selection with the arrow keys', async () => {
            const user = userEvent.setup();
            render(<PlanGroup defaultValue="free" />);

            await user.tab();
            // Radix moves focus (and selection) in a timeout, so wait for it.
            // The key must stay pressed until then: Radix only selects on focus while an arrow key is down.
            await user.keyboard('{ArrowDown>}');
            await waitFor(() => {
                expect(screen.getByRole('radio', { name: 'Pro' })).toBeChecked();
            });
            await user.keyboard('{/ArrowDown}');

            await user.keyboard('{ArrowUp>}');
            await waitFor(() => {
                expect(screen.getByRole('radio', { name: 'Free' })).toBeChecked();
            });
            await user.keyboard('{/ArrowUp}');
        });

        it('moves the selection with left and right arrows when horizontal', async () => {
            const user = userEvent.setup();
            render(<PlanGroup defaultValue="free" orientation="horizontal" />);

            await user.tab();
            await user.keyboard('{ArrowRight>}');

            await waitFor(() => {
                expect(screen.getByRole('radio', { name: 'Pro' })).toBeChecked();
            });
            await user.keyboard('{/ArrowRight}');
        });

        it('selects the focused item with the Space key', async () => {
            const user = userEvent.setup();
            render(<PlanGroup />);

            await user.tab();
            await user.keyboard(' ');

            expect(screen.getByRole('radio', { name: 'Free' })).toBeChecked();
        });
    });

    describe('disabled', () => {
        it('does not change when the whole group is disabled', async () => {
            const user = userEvent.setup();
            render(<PlanGroup defaultValue="free" disabled />);

            await user.click(screen.getByRole('radio', { name: 'Pro' }));

            expect(screen.getByRole('radio', { name: 'Free' })).toBeChecked();
            expect(screen.getByRole('radio', { name: 'Pro' })).toBeDisabled();
        });

        it('does not select a disabled item', async () => {
            const user = userEvent.setup();
            const onValueChange = jest.fn();
            render(
                <RadioGroup aria-label="Plan" onValueChange={onValueChange}>
                    <RadioGroupItem value="free" aria-label="Free" />
                    <RadioGroupItem value="pro" aria-label="Pro" disabled />
                </RadioGroup>,
            );

            await user.click(screen.getByRole('radio', { name: 'Pro' }));

            expect(screen.getByRole('radio', { name: 'Pro' })).not.toBeChecked();
            expect(onValueChange).not.toHaveBeenCalled();
        });
    });

    describe('form', () => {
        it('submits the selected value under the given name', async () => {
            const user = userEvent.setup();
            const onSubmit = jest.fn((event: React.SyntheticEvent) => {
                event.preventDefault();
            });
            render(
                <form onSubmit={onSubmit} data-testid="form">
                    <PlanGroup name="plan" />
                    <button type="submit">Save</button>
                </form>,
            );

            await user.click(screen.getByRole('radio', { name: 'Pro' }));
            await user.click(screen.getByRole('button', { name: 'Save' }));

            const form = screen.getByTestId<HTMLFormElement>('form');
            expect(new FormData(form).get('plan')).toBe('pro');
        });
    });

    describe('orientation', () => {
        it('exposes the orientation to assistive tech', () => {
            render(<PlanGroup orientation="horizontal" />);

            expect(screen.getByRole('radiogroup', { name: 'Plan' })).toHaveAttribute('aria-orientation', 'horizontal');
        });

        it('lays items out in a row when horizontal', () => {
            render(<PlanGroup orientation="horizontal" />);

            expect(screen.getByRole('radiogroup', { name: 'Plan' })).toHaveAttribute('data-orientation', 'horizontal');
        });
    });

    describe('invalid', () => {
        it('passes aria-invalid to the item', () => {
            render(
                <RadioGroup aria-label="Plan">
                    <RadioGroupItem value="free" aria-label="Free" aria-invalid />
                </RadioGroup>,
            );

            expect(screen.getByRole('radio', { name: 'Free' })).toHaveAttribute('aria-invalid', 'true');
        });
    });

    describe('sizes', () => {
        it('uses the md size by default', () => {
            render(<PlanGroup />);

            expect(defaultSize).toBe('md');
            expect(screen.getByRole('radio', { name: 'Free' })).toHaveClass('size-5');
        });

        it.each(RADIO_GROUP_SIZES)('applies the %s size classes', size => {
            render(
                <RadioGroup aria-label="Plan">
                    <RadioGroupItem value="free" aria-label="Free" size={size} />
                </RadioGroup>,
            );

            // Only the circle classes; the dot classes sit on the child span.
            const circleClasses = sizeClasses[size].split(' ').filter(name => !name.startsWith('['));
            expect(screen.getByRole('radio', { name: 'Free' })).toHaveClass(...circleClasses);
        });
    });

    describe('customization', () => {
        it('merges a custom className on the group and the item', () => {
            render(
                <RadioGroup aria-label="Plan" className="custom-group">
                    <RadioGroupItem value="free" aria-label="Free" className="custom-item" />
                </RadioGroup>,
            );

            expect(screen.getByRole('radiogroup', { name: 'Plan' })).toHaveClass('custom-group');
            expect(screen.getByRole('radio', { name: 'Free' })).toHaveClass('custom-item');
        });

        it('lets a custom className override the default gap', () => {
            render(<PlanGroup className="gap-4" />);

            expect(screen.getByRole('radiogroup', { name: 'Plan' })).toHaveClass('gap-4');
            expect(screen.getByRole('radiogroup', { name: 'Plan' })).not.toHaveClass('gap-2');
        });

        it('sets data-slot on every part', () => {
            render(<PlanGroup defaultValue="free" />);

            expect(screen.getByRole('radiogroup', { name: 'Plan' })).toHaveAttribute('data-slot', 'radio-group');
            expect(screen.getByRole('radio', { name: 'Free' })).toHaveAttribute('data-slot', 'radio-group-item');
            expect(document.querySelector('[data-slot="radio-group-indicator"]')).toBeInTheDocument();
        });
    });

    describe('accessibility', () => {
        it('has no axe violations', async () => {
            const { container } = render(
                <RadioGroup aria-label="Plan" defaultValue="free">
                    <div>
                        <RadioGroupItem id="a-free" value="free" />
                        <Label htmlFor="a-free">Free</Label>
                    </div>
                    <div>
                        <RadioGroupItem id="a-pro" value="pro" />
                        <Label htmlFor="a-pro">Pro</Label>
                    </div>
                </RadioGroup>,
            );

            expect(await axe(container)).toHaveNoViolations();
        });
    });
});
