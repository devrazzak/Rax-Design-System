import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';

import { Label } from '@/components/label/label';

import { Checkbox } from './checkbox';
import { CHECKBOX_SIZES, defaultSize, sizeClasses } from './checkbox.variants';

describe('Checkbox', () => {
    describe('behavior', () => {
        it('is unchecked by default and toggles on click', async () => {
            const user = userEvent.setup();
            render(<Checkbox aria-label="Terms" />);
            const checkbox = screen.getByRole('checkbox', { name: 'Terms' });

            expect(checkbox).not.toBeChecked();

            await user.click(checkbox);
            expect(checkbox).toBeChecked();

            await user.click(checkbox);
            expect(checkbox).not.toBeChecked();
        });

        it('reports each change through onCheckedChange', async () => {
            const user = userEvent.setup();
            const onCheckedChange = jest.fn();
            render(<Checkbox aria-label="Terms" onCheckedChange={onCheckedChange} />);

            await user.click(screen.getByRole('checkbox', { name: 'Terms' }));
            await user.click(screen.getByRole('checkbox', { name: 'Terms' }));

            expect(onCheckedChange).toHaveBeenNthCalledWith(1, true);
            expect(onCheckedChange).toHaveBeenNthCalledWith(2, false);
        });

        it('toggles with the Space key', async () => {
            const user = userEvent.setup();
            render(<Checkbox aria-label="Terms" />);

            await user.tab();
            await user.keyboard(' ');

            expect(screen.getByRole('checkbox', { name: 'Terms' })).toBeChecked();
        });

        it('can start checked with defaultChecked', () => {
            render(<Checkbox aria-label="Terms" defaultChecked />);

            expect(screen.getByRole('checkbox', { name: 'Terms' })).toBeChecked();
        });

        it('follows the checked prop when controlled', async () => {
            const user = userEvent.setup();
            const onCheckedChange = jest.fn();
            render(<Checkbox aria-label="Terms" checked={false} onCheckedChange={onCheckedChange} />);

            await user.click(screen.getByRole('checkbox', { name: 'Terms' }));

            expect(onCheckedChange).toHaveBeenCalledWith(true);
            expect(screen.getByRole('checkbox', { name: 'Terms' })).not.toBeChecked();
        });

        it('does not toggle when disabled', async () => {
            const user = userEvent.setup();
            const onCheckedChange = jest.fn();
            render(<Checkbox aria-label="Terms" disabled onCheckedChange={onCheckedChange} />);

            await user.click(screen.getByRole('checkbox', { name: 'Terms' }));

            expect(screen.getByRole('checkbox', { name: 'Terms' })).toBeDisabled();
            expect(screen.getByRole('checkbox', { name: 'Terms' })).not.toBeChecked();
            expect(onCheckedChange).not.toHaveBeenCalled();
        });

        it('toggles when its label is clicked', async () => {
            const user = userEvent.setup();
            render(
                <>
                    <Checkbox id="terms" />
                    <Label htmlFor="terms">Accept terms</Label>
                </>,
            );

            await user.click(screen.getByText('Accept terms'));

            expect(screen.getByRole('checkbox', { name: 'Accept terms' })).toBeChecked();
        });
    });

    describe('indeterminate', () => {
        it('is exposed as a mixed state', () => {
            render(<Checkbox aria-label="Select all" checked="indeterminate" />);

            const checkbox = screen.getByRole('checkbox', { name: 'Select all' });
            expect(checkbox).toBePartiallyChecked();
            expect(checkbox).toHaveAttribute('data-state', 'indeterminate');
        });

        it('becomes checked when clicked', async () => {
            const user = userEvent.setup();
            const onCheckedChange = jest.fn();
            render(<Checkbox aria-label="Select all" checked="indeterminate" onCheckedChange={onCheckedChange} />);

            await user.click(screen.getByRole('checkbox', { name: 'Select all' }));

            expect(onCheckedChange).toHaveBeenCalledWith(true);
        });
    });

    describe('indicator', () => {
        it('shows the mark only when checked or indeterminate', () => {
            const { rerender } = render(<Checkbox aria-label="Terms" checked={false} />);
            expect(document.querySelector('[data-slot="checkbox-indicator"]')).not.toBeInTheDocument();

            rerender(<Checkbox aria-label="Terms" checked />);
            expect(document.querySelector('[data-slot="checkbox-indicator"]')).toBeInTheDocument();

            rerender(<Checkbox aria-label="Terms" checked="indeterminate" />);
            expect(document.querySelector('[data-slot="checkbox-indicator"]')).toBeInTheDocument();
        });
    });

    describe('forms', () => {
        it('submits its value with a native form when checked', async () => {
            const user = userEvent.setup();
            render(
                <form data-testid="form">
                    <Checkbox name="terms" aria-label="Terms" />
                </form>,
            );
            const form = screen.getByTestId('form');

            expect(new FormData(form).get('terms')).toBeNull();

            await user.click(screen.getByRole('checkbox', { name: 'Terms' }));

            expect(new FormData(form).get('terms')).toBe('on');
        });

        it('submits a custom value', () => {
            render(
                <form data-testid="form">
                    <Checkbox name="plan" value="pro" aria-label="Pro plan" defaultChecked />
                </form>,
            );

            expect(new FormData(screen.getByTestId('form')).get('plan')).toBe('pro');
        });
    });

    describe('accessibility', () => {
        it('is found by its label', () => {
            render(
                <>
                    <Checkbox id="terms" />
                    <Label htmlFor="terms">Accept terms</Label>
                </>,
            );

            expect(screen.getByLabelText('Accept terms')).toBe(screen.getByRole('checkbox'));
        });

        it('exposes the invalid state', () => {
            render(<Checkbox aria-label="Terms" aria-invalid />);

            expect(screen.getByRole('checkbox', { name: 'Terms' })).toBeInvalid();
        });

        it.each([
            ['unchecked', {}],
            ['checked', { defaultChecked: true }],
            ['indeterminate', { checked: 'indeterminate' as const }],
        ])('has no axe violations when %s', async (_state, props) => {
            const { container } = render(
                <>
                    <Checkbox id="terms" {...props} />
                    <Label htmlFor="terms">Accept terms</Label>
                </>,
            );

            expect(await axe(container)).toHaveNoViolations();
        });
    });

    describe('size', () => {
        it('uses the md size by default', () => {
            render(<Checkbox aria-label="Terms" />);

            expect(screen.getByRole('checkbox', { name: 'Terms' })).toHaveClass('size-5');
            expect(defaultSize).toBe('md');
        });

        it.each(CHECKBOX_SIZES)('applies size "%s"', size => {
            render(<Checkbox aria-label="Terms" size={size} />);

            expect(screen.getByRole('checkbox', { name: 'Terms' })).toHaveClass(sizeClasses[size]);
        });
    });

    describe('customization', () => {
        it('lets className override the size', () => {
            render(<Checkbox aria-label="Terms" className="size-10" />);

            const checkbox = screen.getByRole('checkbox', { name: 'Terms' });
            expect(checkbox).toHaveClass('size-10');
            expect(checkbox).not.toHaveClass('size-5');
        });

        it('forwards native attributes to the root element', () => {
            render(<Checkbox aria-label="Terms" id="terms-checkbox" name="terms" />);

            const checkbox = screen.getByRole('checkbox', { name: 'Terms' });
            expect(checkbox).toHaveAttribute('id', 'terms-checkbox');
            expect(checkbox).toHaveAttribute('data-slot', 'checkbox');
        });
    });
});
