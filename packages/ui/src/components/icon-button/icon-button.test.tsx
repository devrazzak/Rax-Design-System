import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';

import { BUTTON_VARIANTS } from '@/components/button/button.variants';
import { TooltipProvider } from '@/components/tooltip/tooltip';

import type { IconButtonProps } from './icon-button';
import { IconButton } from './icon-button';
import {
    defaultRounded,
    defaultSize,
    ICON_BUTTON_ROUNDEDS,
    ICON_BUTTON_SIZES,
    roundedClasses,
    sizeClasses,
} from './icon-button.variants';

/** IconButton shows a tooltip, so it needs the provider every tooltip needs. */
function renderIconButton(props?: Partial<IconButtonProps>) {
    return render(
        <TooltipProvider>
            <IconButton label="Send email" {...props}>
                <svg aria-hidden="true" />
            </IconButton>
        </TooltipProvider>,
    );
}

/** The `region` rule asks a whole page to sit inside landmarks, which does not apply to a single component. */
const axeOptions = { rules: { region: { enabled: false } } };

describe('IconButton', () => {
    describe('behavior', () => {
        it('uses the label as the accessible name', () => {
            renderIconButton();

            expect(screen.getByRole('button', { name: 'Send email' })).toBeInTheDocument();
        });

        it('has the icon-button slot', () => {
            renderIconButton();

            expect(screen.getByRole('button')).toHaveAttribute('data-slot', 'icon-button');
        });

        it('calls onClick when clicked', async () => {
            const user = userEvent.setup();
            const onClick = jest.fn();
            renderIconButton({ onClick });

            await user.click(screen.getByRole('button'));

            expect(onClick).toHaveBeenCalledTimes(1);
        });
    });

    describe('tooltip', () => {
        it('shows the label when the button is hovered', async () => {
            const user = userEvent.setup();
            renderIconButton();

            await user.hover(screen.getByRole('button'));

            expect(await screen.findByRole('tooltip')).toHaveTextContent('Send email');
        });

        it('shows the label when the button gets keyboard focus', async () => {
            const user = userEvent.setup();
            renderIconButton();

            await user.tab();

            expect(await screen.findByRole('tooltip')).toHaveTextContent('Send email');
        });

        it('shows no tooltip with tooltip={false}', async () => {
            const user = userEvent.setup();
            renderIconButton({ tooltip: false });

            await user.hover(screen.getByRole('button'));

            expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
        });
    });

    describe('size', () => {
        it('uses the default size', () => {
            renderIconButton();

            expect(defaultSize).toBe('md');
            expect(screen.getByRole('button')).toHaveClass('h-12', 'w-12', 'px-0');
        });

        it.each(ICON_BUTTON_SIZES)('applies size "%s"', size => {
            renderIconButton({ size });

            const button = screen.getByRole('button');
            expect(button).toHaveAttribute('data-size', size);
            expect(button).toHaveClass(...sizeClasses[size].split(' '));
        });
    });

    describe('rounded', () => {
        it('uses the default radius', () => {
            renderIconButton();

            expect(defaultRounded).toBe('md');
            expect(screen.getByRole('button')).toHaveClass('rounded-md');
        });

        it.each(ICON_BUTTON_ROUNDEDS)('applies rounded "%s"', rounded => {
            renderIconButton({ rounded });

            expect(screen.getByRole('button')).toHaveClass(roundedClasses[rounded]);
        });

        it('is a circle with rounded="full"', () => {
            renderIconButton({ rounded: 'full' });

            const button = screen.getByRole('button');
            expect(button).toHaveClass('rounded-full');
            expect(button).not.toHaveClass('rounded-md');
        });
    });

    describe('variant', () => {
        it.each(BUTTON_VARIANTS)('passes variant "%s" to the button', variant => {
            renderIconButton({ variant });

            expect(screen.getByRole('button')).toHaveAttribute('data-variant', variant);
        });
    });

    describe('customization', () => {
        it('lets className override the defaults', () => {
            renderIconButton({ className: 'w-20' });

            const button = screen.getByRole('button');
            expect(button).toHaveClass('w-20');
            expect(button).not.toHaveClass('w-12');
        });

        it('forwards native attributes to the button', () => {
            renderIconButton({ id: 'send', disabled: true });

            const button = screen.getByRole('button');
            expect(button).toHaveAttribute('id', 'send');
            expect(button).toBeDisabled();
        });
    });

    describe('accessibility', () => {
        it('has no axe violations', async () => {
            const { container } = renderIconButton();

            expect(await axe(container, axeOptions)).toHaveNoViolations();
        });

        it('has no axe violations without a tooltip', async () => {
            const { container } = renderIconButton({ tooltip: false });

            expect(await axe(container, axeOptions)).toHaveNoViolations();
        });
    });
});
