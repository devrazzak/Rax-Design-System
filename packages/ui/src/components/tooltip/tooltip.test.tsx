import type { ComponentProps } from 'react';

import { act, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';

import type { TooltipContentProps } from './tooltip';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './tooltip';
import {
    arrowClasses,
    defaultVariants,
    sizeClasses,
    TOOLTIP_SIZES,
    TOOLTIP_VARIANTS,
    variantClasses,
} from './tooltip.variants';

type TestTooltipProps = ComponentProps<typeof Tooltip> & {
    content?: TooltipContentProps;
    delayDuration?: number;
};

/** One trigger and one tooltip, wrapped in the provider every tooltip needs. */
function TestTooltip({ content, delayDuration, ...props }: TestTooltipProps) {
    return (
        <TooltipProvider delayDuration={delayDuration}>
            <Tooltip {...props}>
                <TooltipTrigger>Trigger</TooltipTrigger>
                <TooltipContent {...content}>Add to library</TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
}

/**
 * The `region` rule asks a whole page to sit inside landmarks. A tooltip is a piece of a page,
 * and its portal ends up outside any landmark, so the rule is switched off here.
 */
const axeOptions = { rules: { region: { enabled: false } } };

/** Floating UI places the tooltip after the first render. Waiting inside act lets that finish without a warning. */
async function renderOpenTooltip(content?: TooltipContentProps) {
    render(<TestTooltip defaultOpen content={content} />);
    await act(() => Promise.resolve());
}

/** Class names with brackets are long, so tests pass them as a list. */
function classList(classes: string) {
    return classes.split(' ');
}

function getArrow() {
    const arrow = screen.getByRole('tooltip').querySelector('svg');
    if (!arrow) throw new Error('Tooltip arrow not found');
    return arrow;
}

describe('Tooltip', () => {
    describe('behavior', () => {
        it('is closed at first', () => {
            render(<TestTooltip />);

            expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
        });

        it('opens when the trigger is hovered', async () => {
            const user = userEvent.setup();
            render(<TestTooltip />);

            await user.hover(screen.getByRole('button', { name: 'Trigger' }));

            expect(await screen.findByRole('tooltip')).toHaveTextContent('Add to library');
        });

        it('opens when the trigger gets keyboard focus', async () => {
            const user = userEvent.setup();
            render(<TestTooltip />);

            await user.tab();

            expect(await screen.findByRole('tooltip')).toHaveTextContent('Add to library');
        });

        it('closes when the trigger loses focus', async () => {
            const user = userEvent.setup();
            render(<TestTooltip />);

            await user.tab();
            await screen.findByRole('tooltip');
            // The trigger is the only focusable element, so Tab would come back to it. Blur it directly instead.
            act(() => screen.getByRole('button', { name: 'Trigger' }).blur());

            await waitFor(() => expect(screen.queryByRole('tooltip')).not.toBeInTheDocument());
        });

        it('closes with the Escape key', async () => {
            const user = userEvent.setup();
            render(<TestTooltip />);

            await user.tab();
            await screen.findByRole('tooltip');
            await user.keyboard('{Escape}');

            await waitFor(() => expect(screen.queryByRole('tooltip')).not.toBeInTheDocument());
        });

        it('closes when the trigger is clicked', async () => {
            const user = userEvent.setup();
            render(<TestTooltip />);

            const trigger = screen.getByRole('button', { name: 'Trigger' });
            await user.hover(trigger);
            await screen.findByRole('tooltip');
            await user.click(trigger);

            await waitFor(() => expect(screen.queryByRole('tooltip')).not.toBeInTheDocument());
        });

        it('is open from the start with defaultOpen', () => {
            render(<TestTooltip defaultOpen />);

            expect(screen.getByRole('tooltip')).toBeInTheDocument();
        });

        it('can be controlled with open', () => {
            const { rerender } = render(<TestTooltip open />);
            expect(screen.getByRole('tooltip')).toBeInTheDocument();

            rerender(<TestTooltip open={false} />);
            expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
        });

        it('calls onOpenChange when it opens', async () => {
            const user = userEvent.setup();
            const onOpenChange = jest.fn();
            render(<TestTooltip onOpenChange={onOpenChange} />);

            await user.hover(screen.getByRole('button', { name: 'Trigger' }));

            await waitFor(() => expect(onOpenChange).toHaveBeenCalledWith(true));
        });
    });

    describe('delay', () => {
        it('opens without waiting by default', async () => {
            const user = userEvent.setup();
            render(<TestTooltip />);

            await user.hover(screen.getByRole('button', { name: 'Trigger' }));

            // Radix alone would wait 700ms, which is longer than this timeout
            expect(await screen.findByRole('tooltip', undefined, { timeout: 300 })).toBeInTheDocument();
        });

        it('waits for a delayDuration given to the provider', async () => {
            const user = userEvent.setup();
            render(<TestTooltip delayDuration={1000} />);

            await user.hover(screen.getByRole('button', { name: 'Trigger' }));
            await new Promise(resolve => setTimeout(resolve, 300));

            expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
        });
    });

    describe('accessibility', () => {
        it('has the tooltip role', () => {
            render(<TestTooltip defaultOpen />);

            expect(screen.getByRole('tooltip')).toBeInTheDocument();
        });

        it('describes the trigger while it is open', () => {
            render(<TestTooltip defaultOpen />);

            expect(screen.getByRole('button', { name: 'Trigger' })).toHaveAttribute(
                'aria-describedby',
                screen.getByRole('tooltip').id,
            );
        });

        it('does not describe the trigger while it is closed', () => {
            render(<TestTooltip />);

            expect(screen.getByRole('button', { name: 'Trigger' })).not.toHaveAttribute('aria-describedby');
        });

        it('has no axe violations when closed', async () => {
            const { container } = render(<TestTooltip />);

            expect(await axe(container)).toHaveNoViolations();
        });

        it('has no axe violations when open', async () => {
            await renderOpenTooltip();

            expect(await axe(document.body, axeOptions)).toHaveNoViolations();
        });

        it.each(TOOLTIP_VARIANTS)('has no axe violations with variant "%s"', async variant => {
            await renderOpenTooltip({ variant });

            expect(await axe(document.body, axeOptions)).toHaveNoViolations();
        });
    });

    describe('variant', () => {
        it('uses the default variant by default', () => {
            render(<TestTooltip defaultOpen />);

            const tooltip = screen.getByRole('tooltip');
            expect(defaultVariants.variant).toBe('default');
            expect(tooltip).toHaveAttribute('data-variant', 'default');
            expect(tooltip).toHaveClass('bg-foreground', 'text-background');
        });

        it.each(TOOLTIP_VARIANTS)('applies variant "%s"', variant => {
            render(<TestTooltip defaultOpen content={{ variant }} />);

            const tooltip = screen.getByRole('tooltip');
            expect(tooltip).toHaveAttribute('data-variant', variant);
            expect(tooltip).toHaveClass(...classList(variantClasses[variant]));
        });

        it.each([
            ['primary', 'bg-primary', 'text-primary-foreground'],
            ['secondary', 'bg-secondary', 'text-secondary-foreground'],
            ['destructive', 'bg-destructive', 'text-destructive-foreground'],
        ] as const)('maps variant "%s" to %s and %s', (variant, backgroundClass, textClass) => {
            render(<TestTooltip defaultOpen content={{ variant }} />);

            expect(screen.getByRole('tooltip')).toHaveClass(backgroundClass, textClass);
        });

        it('gives the arrow the color of the default variant', () => {
            render(<TestTooltip defaultOpen />);

            expect(getArrow()).toHaveClass('bg-foreground', 'fill-foreground');
        });

        it.each(TOOLTIP_VARIANTS)('gives the arrow the color of variant "%s"', variant => {
            render(<TestTooltip defaultOpen content={{ variant }} />);

            expect(getArrow()).toHaveClass(...classList(arrowClasses[variant]));
        });
    });

    describe('size', () => {
        it('uses the md size by default', () => {
            render(<TestTooltip defaultOpen />);

            const tooltip = screen.getByRole('tooltip');
            expect(defaultVariants.size).toBe('md');
            expect(tooltip).toHaveAttribute('data-size', 'md');
            expect(tooltip).toHaveClass('px-3', 'py-1.5', 'text-sm');
        });

        it.each(TOOLTIP_SIZES)('applies size "%s"', size => {
            render(<TestTooltip defaultOpen content={{ size }} />);

            const tooltip = screen.getByRole('tooltip');
            expect(tooltip).toHaveAttribute('data-size', size);
            expect(tooltip).toHaveClass(...classList(sizeClasses[size]));
        });

        it.each([
            ['sm', 'px-2', 'py-1', 'text-xs'],
            ['md', 'px-3', 'py-1.5', 'text-sm'],
            ['lg', 'px-4', 'py-2', 'text-base'],
            ['xl', 'px-5', 'py-2.5', 'text-lg'],
        ] as const)('maps size "%s" to %s, %s and %s', (size, paddingX, paddingY, textClass) => {
            render(<TestTooltip defaultOpen content={{ size }} />);

            expect(screen.getByRole('tooltip')).toHaveClass(paddingX, paddingY, textClass);
        });
    });

    describe('customization', () => {
        it('sets data-slot on the trigger and the content', () => {
            render(<TestTooltip defaultOpen />);

            expect(screen.getByRole('button', { name: 'Trigger' })).toHaveAttribute('data-slot', 'tooltip-trigger');
            expect(screen.getByRole('tooltip')).toHaveAttribute('data-slot', 'tooltip-content');
        });

        it('is a rounded, medium weight box with a shadow and a maximum width', () => {
            render(<TestTooltip defaultOpen />);

            expect(screen.getByRole('tooltip')).toHaveClass('rounded-md', 'font-medium', 'shadow-md', 'max-w-xs');
        });

        it('zooms in when it opens after a delay and zooms out when it closes', () => {
            render(<TestTooltip defaultOpen />);

            expect(screen.getByRole('tooltip')).toHaveClass(
                'origin-(--radix-tooltip-content-transform-origin)',
                'data-[state=delayed-open]:motion-safe:animate-zoom-in',
                'data-[state=closed]:motion-safe:animate-zoom-out',
            );
        });

        it('only animates the delayed open, not the instant open', () => {
            render(<TestTooltip defaultOpen />);

            expect(screen.getByRole('tooltip').className).not.toContain('instant-open');
        });

        it('opens as delayed-open on hover and as instant-open on focus', async () => {
            const user = userEvent.setup();
            const { unmount } = render(<TestTooltip />);

            await user.hover(screen.getByRole('button', { name: 'Trigger' }));
            expect(await screen.findByRole('tooltip')).toHaveAttribute('data-state', 'delayed-open');
            unmount();

            render(<TestTooltip />);
            await user.tab();
            expect(await screen.findByRole('tooltip')).toHaveAttribute('data-state', 'instant-open');
        });

        it('passes native props to the content', () => {
            render(<TestTooltip defaultOpen content={{ id: 'library-tip' }} />);

            expect(screen.getByRole('tooltip')).toHaveAttribute('id', 'library-tip');
        });

        it('merges a custom className', () => {
            render(<TestTooltip defaultOpen content={{ className: 'custom-class' }} />);

            expect(screen.getByRole('tooltip')).toHaveClass('custom-class');
        });

        it('lets a custom className override the padding', () => {
            render(<TestTooltip defaultOpen content={{ className: 'px-6' }} />);

            const tooltip = screen.getByRole('tooltip');
            expect(tooltip).toHaveClass('px-6');
            expect(tooltip).not.toHaveClass('px-3');
        });

        it('lets a custom className override the background', () => {
            render(<TestTooltip defaultOpen content={{ className: 'bg-muted' }} />);

            const tooltip = screen.getByRole('tooltip');
            expect(tooltip).toHaveClass('bg-muted');
            expect(tooltip).not.toHaveClass('bg-foreground');
        });
    });
});
