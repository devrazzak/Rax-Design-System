import { useState } from 'react';

import { SearchIcon } from '@/icons';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';

import { Toggle } from './toggle';
import { defaultVariants, sizeClasses, TOGGLE_SIZES, TOGGLE_VARIANTS, variantClasses } from './toggle.variants';

/** The pressed state lives in the parent, and the parent shows it. */
function ControlledToggle() {
    const [pressed, setPressed] = useState(false);

    return (
        <>
            <Toggle pressed={pressed} onPressedChange={setPressed}>
                Bold
            </Toggle>
            <p>Pressed: {String(pressed)}</p>
        </>
    );
}

describe('Toggle', () => {
    describe('behavior', () => {
        it('is not pressed by default', () => {
            render(<Toggle>Bold</Toggle>);

            const toggle = screen.getByRole('button', { name: 'Bold' });
            expect(toggle).toHaveAttribute('aria-pressed', 'false');
            expect(toggle).toHaveAttribute('data-state', 'off');
        });

        it('is pressed when defaultPressed is set', () => {
            render(<Toggle defaultPressed>Bold</Toggle>);

            const toggle = screen.getByRole('button', { name: 'Bold' });
            expect(toggle).toHaveAttribute('aria-pressed', 'true');
            expect(toggle).toHaveAttribute('data-state', 'on');
        });

        it('switches between pressed and not pressed when clicked', async () => {
            const user = userEvent.setup();
            render(<Toggle>Bold</Toggle>);
            const toggle = screen.getByRole('button', { name: 'Bold' });

            await user.click(toggle);
            expect(toggle).toHaveAttribute('aria-pressed', 'true');

            await user.click(toggle);
            expect(toggle).toHaveAttribute('aria-pressed', 'false');
        });

        it('switches with the Space and Enter keys', async () => {
            const user = userEvent.setup();
            render(<Toggle>Bold</Toggle>);
            const toggle = screen.getByRole('button', { name: 'Bold' });

            toggle.focus();
            await user.keyboard(' ');
            expect(toggle).toHaveAttribute('aria-pressed', 'true');

            await user.keyboard('{Enter}');
            expect(toggle).toHaveAttribute('aria-pressed', 'false');
        });

        it('calls onPressedChange with the new state', async () => {
            const user = userEvent.setup();
            const onPressedChange = jest.fn();
            render(<Toggle onPressedChange={onPressedChange}>Bold</Toggle>);

            await user.click(screen.getByRole('button', { name: 'Bold' }));

            expect(onPressedChange).toHaveBeenCalledWith(true);
        });

        it('follows the parent in controlled mode', async () => {
            const user = userEvent.setup();
            render(<ControlledToggle />);

            await user.click(screen.getByRole('button', { name: 'Bold' }));

            expect(screen.getByRole('button', { name: 'Bold' })).toHaveAttribute('aria-pressed', 'true');
            expect(screen.getByText('Pressed: true')).toBeInTheDocument();
        });

        it('does not change when disabled', async () => {
            const user = userEvent.setup();
            const onPressedChange = jest.fn();
            render(
                <Toggle disabled onPressedChange={onPressedChange}>
                    Bold
                </Toggle>,
            );
            const toggle = screen.getByRole('button', { name: 'Bold' });

            await user.click(toggle);

            expect(toggle).toBeDisabled();
            expect(toggle).toHaveAttribute('aria-pressed', 'false');
            expect(onPressedChange).not.toHaveBeenCalled();
        });
    });

    describe('accessibility', () => {
        it('has the button role and reports its pressed state', () => {
            render(<Toggle>Bold</Toggle>);

            expect(screen.getByRole('button', { name: 'Bold', pressed: false })).toBeInTheDocument();
        });

        it('is named by aria-label when it has only an icon', () => {
            render(
                <Toggle aria-label="Search">
                    <SearchIcon />
                </Toggle>,
            );

            expect(screen.getByRole('button', { name: 'Search' })).toBeInTheDocument();
        });

        it('can be focused with the keyboard', async () => {
            const user = userEvent.setup();
            render(<Toggle>Bold</Toggle>);

            await user.tab();

            expect(screen.getByRole('button', { name: 'Bold' })).toHaveFocus();
        });

        it('has no axe violations', async () => {
            const { container } = render(<Toggle>Bold</Toggle>);

            expect(await axe(container)).toHaveNoViolations();
        });

        it('has no axe violations when it has only an icon', async () => {
            const { container } = render(
                <Toggle aria-label="Search">
                    <SearchIcon />
                </Toggle>,
            );

            expect(await axe(container)).toHaveNoViolations();
        });
    });

    describe('variant', () => {
        it('uses the default variant', () => {
            render(<Toggle>Bold</Toggle>);

            expect(defaultVariants.variant).toBe('default');
            expect(screen.getByRole('button', { name: 'Bold' })).toHaveAttribute('data-variant', 'default');
        });

        it.each(TOGGLE_VARIANTS)('applies variant "%s"', variant => {
            render(<Toggle variant={variant}>Bold</Toggle>);

            const toggle = screen.getByRole('button', { name: 'Bold' });
            expect(toggle).toHaveAttribute('data-variant', variant);
            expect(toggle).toHaveClass(variantClasses[variant]);
        });
    });

    describe('size', () => {
        it('uses the md size by default', () => {
            render(<Toggle>Bold</Toggle>);

            expect(defaultVariants.size).toBe('md');
            expect(screen.getByRole('button', { name: 'Bold' })).toHaveAttribute('data-size', 'md');
            expect(screen.getByRole('button', { name: 'Bold' })).toHaveClass('h-12', 'min-w-12');
        });

        it.each(TOGGLE_SIZES)('applies size "%s"', size => {
            render(<Toggle size={size}>Bold</Toggle>);

            const toggle = screen.getByRole('button', { name: 'Bold' });
            expect(toggle).toHaveAttribute('data-size', size);
            expect(toggle).toHaveClass(sizeClasses[size]);
        });
    });

    describe('customization', () => {
        it('sets data-slot', () => {
            render(<Toggle>Bold</Toggle>);

            expect(screen.getByRole('button', { name: 'Bold' })).toHaveAttribute('data-slot', 'toggle');
        });

        it('merges a custom className', () => {
            render(<Toggle className="custom-class">Bold</Toggle>);

            expect(screen.getByRole('button', { name: 'Bold' })).toHaveClass('custom-class');
        });

        it('lets a custom className override the radius', () => {
            render(<Toggle className="rounded-none">Bold</Toggle>);

            const toggle = screen.getByRole('button', { name: 'Bold' });
            expect(toggle).toHaveClass('rounded-none');
            expect(toggle).not.toHaveClass('rounded-md');
        });
    });
});
