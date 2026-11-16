import type { ComponentProps } from 'react';

import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';

import {
    Popover,
    PopoverAnchor,
    PopoverContent,
    PopoverDescription,
    PopoverHeader,
    PopoverTitle,
    PopoverTrigger,
} from './popover';

type TestPopoverProps = ComponentProps<typeof Popover> & {
    content?: ComponentProps<typeof PopoverContent>;
};

/** One trigger and one popover with a header and a button inside. */
function TestPopover({ content, ...props }: TestPopoverProps) {
    return (
        <Popover {...props}>
            <PopoverTrigger>Open</PopoverTrigger>
            <PopoverContent aria-label="Dimensions" {...content}>
                <PopoverHeader>
                    <PopoverTitle>Dimensions</PopoverTitle>
                    <PopoverDescription>Set the dimensions for the layer.</PopoverDescription>
                </PopoverHeader>
                <button type="button">Save</button>
            </PopoverContent>
        </Popover>
    );
}

/**
 * The `region` rule asks a whole page to sit inside landmarks. A popover is a piece of a page,
 * and its portal ends up outside any landmark, so the rule is switched off here.
 */
const axeOptions = { rules: { region: { enabled: false } } };

/** Floating UI places the popover after the first render. Waiting inside act lets that finish without a warning. */
async function renderOpenPopover(content?: TestPopoverProps['content']) {
    render(<TestPopover defaultOpen content={content} />);
    await act(() => Promise.resolve());
}

/** Class names with brackets are long, so tests pass them as a list. */
function classList(classes: string) {
    return classes.split(' ');
}

describe('Popover', () => {
    describe('behavior', () => {
        it('is closed at first', () => {
            render(<TestPopover />);

            expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
        });

        it('opens when the trigger is clicked', async () => {
            const user = userEvent.setup();
            render(<TestPopover />);

            await user.click(screen.getByRole('button', { name: 'Open' }));

            expect(await screen.findByRole('dialog')).toHaveTextContent('Dimensions');
        });

        it('closes when the trigger is clicked again', async () => {
            const user = userEvent.setup();
            render(<TestPopover />);
            const trigger = screen.getByRole('button', { name: 'Open' });

            await user.click(trigger);
            await screen.findByRole('dialog');
            await user.click(trigger);

            expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
        });

        it('closes on Escape', async () => {
            const user = userEvent.setup();
            await renderOpenPopover();

            await user.keyboard('{Escape}');

            expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
        });

        it('closes when the pointer goes down outside', async () => {
            const user = userEvent.setup();
            await renderOpenPopover();

            await user.click(document.body);

            expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
        });

        it('stays open when the content is clicked', async () => {
            const user = userEvent.setup();
            await renderOpenPopover();

            await user.click(screen.getByRole('button', { name: 'Save' }));

            expect(screen.getByRole('dialog')).toBeInTheDocument();
        });

        it('moves focus to the first focusable element on open and back to the trigger on close', async () => {
            const user = userEvent.setup();
            render(<TestPopover />);
            const trigger = screen.getByRole('button', { name: 'Open' });

            await user.click(trigger);
            await screen.findByRole('dialog');
            expect(screen.getByRole('button', { name: 'Save' })).toHaveFocus();

            await user.keyboard('{Escape}');
            expect(trigger).toHaveFocus();
        });

        it('calls onOpenChange when it opens and closes', async () => {
            const user = userEvent.setup();
            const onOpenChange = jest.fn();
            render(<TestPopover onOpenChange={onOpenChange} />);

            await user.click(screen.getByRole('button', { name: 'Open' }));
            await user.keyboard('{Escape}');

            expect(onOpenChange).toHaveBeenNthCalledWith(1, true);
            expect(onOpenChange).toHaveBeenNthCalledWith(2, false);
        });

        it('stays closed when it is controlled and open is false', async () => {
            const user = userEvent.setup();
            render(<TestPopover open={false} />);

            await user.click(screen.getByRole('button', { name: 'Open' }));

            expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
        });
    });

    describe('content', () => {
        it('renders the content in a portal outside the container', async () => {
            const { container } = render(<TestPopover defaultOpen />);
            await act(() => Promise.resolve());

            expect(container).not.toContainElement(screen.getByRole('dialog'));
        });

        it('has the data-slot attributes', async () => {
            await renderOpenPopover();

            expect(screen.getByRole('button', { name: 'Open' })).toHaveAttribute('data-slot', 'popover-trigger');
            expect(screen.getByRole('dialog')).toHaveAttribute('data-slot', 'popover-content');
            expect(screen.getByText('Dimensions').parentElement).toHaveAttribute('data-slot', 'popover-header');
            expect(screen.getByText('Dimensions')).toHaveAttribute('data-slot', 'popover-title');
            expect(screen.getByText('Set the dimensions for the layer.')).toHaveAttribute(
                'data-slot',
                'popover-description',
            );
        });

        it('has the default width, padding, radius and border', async () => {
            await renderOpenPopover();

            expect(screen.getByRole('dialog')).toHaveClass(...classList('w-72 p-4 rounded-md border border-border'));
        });

        it('uses the shared overlay animation classes', async () => {
            await renderOpenPopover();

            expect(screen.getByRole('dialog')).toHaveClass(
                'data-[state=open]:motion-safe:animate-zoom-in',
                'data-[state=closed]:motion-safe:animate-zoom-out',
            );
        });

        it('merges a custom className and lets it override the width', async () => {
            await renderOpenPopover({ className: 'w-96' });

            const dialog = screen.getByRole('dialog');
            expect(dialog).toHaveClass('w-96');
            expect(dialog).not.toHaveClass('w-72');
        });

        it('opens below the trigger and centered by default', async () => {
            await renderOpenPopover();

            const dialog = screen.getByRole('dialog');
            expect(dialog).toHaveAttribute('data-side', 'bottom');
            expect(dialog).toHaveAttribute('data-align', 'center');
        });

        // jsdom has no layout, so collision detection would flip the side. It is switched off here.
        it.each(['top', 'right', 'bottom', 'left'] as const)('accepts side %s', async side => {
            await renderOpenPopover({ side, avoidCollisions: false });

            expect(screen.getByRole('dialog')).toHaveAttribute('data-side', side);
        });

        it.each(['start', 'center', 'end'] as const)('accepts align %s', async align => {
            await renderOpenPopover({ align });

            expect(screen.getByRole('dialog')).toHaveAttribute('data-align', align);
        });

        it('passes extra props to the content', async () => {
            await renderOpenPopover({ id: 'custom-id' });

            expect(screen.getByRole('dialog')).toHaveAttribute('id', 'custom-id');
        });
    });

    describe('parts', () => {
        it('merges className on the header, title and description', async () => {
            render(
                <Popover defaultOpen>
                    <PopoverTrigger>Open</PopoverTrigger>
                    <PopoverContent>
                        <PopoverHeader className="header-extra">
                            <PopoverTitle className="title-extra">Title</PopoverTitle>
                            <PopoverDescription className="description-extra">Description</PopoverDescription>
                        </PopoverHeader>
                    </PopoverContent>
                </Popover>,
            );
            await act(() => Promise.resolve());

            expect(screen.getByText('Title').parentElement).toHaveClass('header-extra', 'flex', 'flex-col');
            expect(screen.getByText('Title')).toHaveClass('title-extra', 'font-medium');
            expect(screen.getByText('Description')).toHaveClass('description-extra', 'text-muted-foreground');
        });

        it('positions the content against the anchor and has a data-slot', async () => {
            render(
                <Popover defaultOpen>
                    <PopoverAnchor data-testid="anchor">Anchor</PopoverAnchor>
                    <PopoverContent>Content</PopoverContent>
                </Popover>,
            );
            await act(() => Promise.resolve());

            expect(screen.getByTestId('anchor')).toHaveAttribute('data-slot', 'popover-anchor');
            expect(screen.getByRole('dialog')).toBeInTheDocument();
        });
    });

    describe('accessibility', () => {
        it('links the trigger to the content', async () => {
            await renderOpenPopover();

            const trigger = screen.getByRole('button', { name: 'Open' });
            expect(trigger).toHaveAttribute('aria-haspopup', 'dialog');
            expect(trigger).toHaveAttribute('aria-expanded', 'true');
            expect(trigger).toHaveAttribute('aria-controls', screen.getByRole('dialog').id);
        });

        it('has no axe violations when closed', async () => {
            render(<TestPopover />);

            expect(await axe(document.body, axeOptions)).toHaveNoViolations();
        });

        it('has no axe violations when open', async () => {
            await renderOpenPopover();

            expect(await axe(document.body, axeOptions)).toHaveNoViolations();
        });
    });
});
