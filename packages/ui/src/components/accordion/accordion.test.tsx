import type { ComponentProps } from 'react';
import { useState } from 'react';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './accordion';
import { ACCORDION_SIZES, defaultSize, sizeClasses } from './accordion.variants';

/** Three items, the last one disabled, so every test can use the same markup. */
function TestAccordion(props: ComponentProps<typeof Accordion>) {
    return (
        <Accordion {...props}>
            <AccordionItem value="one">
                <AccordionTrigger>First</AccordionTrigger>
                <AccordionContent>First answer</AccordionContent>
            </AccordionItem>
            <AccordionItem value="two">
                <AccordionTrigger>Second</AccordionTrigger>
                <AccordionContent>Second answer</AccordionContent>
            </AccordionItem>
            <AccordionItem value="three" disabled>
                <AccordionTrigger>Third</AccordionTrigger>
                <AccordionContent>Third answer</AccordionContent>
            </AccordionItem>
        </Accordion>
    );
}

function ControlledAccordion() {
    const [value, setValue] = useState('');

    return (
        <>
            <TestAccordion type="single" collapsible value={value} onValueChange={setValue} />
            <button type="button" onClick={() => setValue('two')}>
                Open second
            </button>
        </>
    );
}

/** Class names with brackets are long, so tests pass them as a list. */
function classList(classes: string) {
    return classes.split(' ');
}

describe('Accordion', () => {
    describe('behavior', () => {
        it('is collapsed by default', () => {
            render(<TestAccordion type="single" collapsible />);

            expect(screen.getByRole('button', { name: 'First' })).toHaveAttribute('aria-expanded', 'false');
            expect(screen.queryByText('First answer')).not.toBeInTheDocument();
        });

        it('opens an item on click and closes it on a second click', async () => {
            const user = userEvent.setup();
            render(<TestAccordion type="single" collapsible />);
            const trigger = screen.getByRole('button', { name: 'First' });

            await user.click(trigger);
            expect(trigger).toHaveAttribute('aria-expanded', 'true');
            expect(screen.getByText('First answer')).toBeInTheDocument();

            await user.click(trigger);
            expect(trigger).toHaveAttribute('aria-expanded', 'false');
            expect(screen.queryByText('First answer')).not.toBeInTheDocument();
        });

        it('keeps the open item open without collapsible', async () => {
            const user = userEvent.setup();
            render(<TestAccordion type="single" defaultValue="one" />);
            const trigger = screen.getByRole('button', { name: 'First' });

            await user.click(trigger);

            expect(trigger).toHaveAttribute('aria-expanded', 'true');
        });

        it('closes the open item when another one opens in single mode', async () => {
            const user = userEvent.setup();
            render(<TestAccordion type="single" collapsible defaultValue="one" />);

            await user.click(screen.getByRole('button', { name: 'Second' }));

            expect(screen.getByRole('button', { name: 'First' })).toHaveAttribute('aria-expanded', 'false');
            expect(screen.getByRole('button', { name: 'Second' })).toHaveAttribute('aria-expanded', 'true');
        });

        it('keeps several items open in multiple mode', async () => {
            const user = userEvent.setup();
            render(<TestAccordion type="multiple" />);

            await user.click(screen.getByRole('button', { name: 'First' }));
            await user.click(screen.getByRole('button', { name: 'Second' }));

            expect(screen.getByText('First answer')).toBeInTheDocument();
            expect(screen.getByText('Second answer')).toBeInTheDocument();
        });

        it('opens the item from defaultValue', () => {
            render(<TestAccordion type="single" collapsible defaultValue="two" />);

            expect(screen.getByRole('button', { name: 'Second' })).toHaveAttribute('aria-expanded', 'true');
            expect(screen.getByText('Second answer')).toBeInTheDocument();
        });

        it('calls onValueChange with the opened item', async () => {
            const user = userEvent.setup();
            const onValueChange = jest.fn();
            render(<TestAccordion type="single" collapsible onValueChange={onValueChange} />);

            await user.click(screen.getByRole('button', { name: 'Second' }));

            expect(onValueChange).toHaveBeenCalledWith('two');
        });

        it('follows the value in controlled mode', async () => {
            const user = userEvent.setup();
            render(<ControlledAccordion />);

            await user.click(screen.getByRole('button', { name: 'Open second' }));
            expect(screen.getByRole('button', { name: 'Second' })).toHaveAttribute('aria-expanded', 'true');

            await user.click(screen.getByRole('button', { name: 'First' }));
            expect(screen.getByRole('button', { name: 'First' })).toHaveAttribute('aria-expanded', 'true');
            expect(screen.getByRole('button', { name: 'Second' })).toHaveAttribute('aria-expanded', 'false');
        });

        it('does not open a disabled item', async () => {
            const user = userEvent.setup();
            render(<TestAccordion type="single" collapsible />);
            const trigger = screen.getByRole('button', { name: 'Third' });

            expect(trigger).toBeDisabled();

            await user.click(trigger);
            expect(trigger).toHaveAttribute('aria-expanded', 'false');
        });

        it('does not open any item when the whole accordion is disabled', async () => {
            const user = userEvent.setup();
            render(<TestAccordion type="single" collapsible disabled />);

            await user.click(screen.getByRole('button', { name: 'First' }));

            expect(screen.getByRole('button', { name: 'First' })).toHaveAttribute('aria-expanded', 'false');
        });
    });

    describe('keyboard', () => {
        it.each(['{Enter}', ' '])('opens the focused item with %j', async key => {
            const user = userEvent.setup();
            render(<TestAccordion type="single" collapsible />);

            await user.tab();
            await user.keyboard(key);

            expect(screen.getByRole('button', { name: 'First' })).toHaveAttribute('aria-expanded', 'true');
        });

        it('moves focus to the next and previous trigger with the arrow keys', async () => {
            const user = userEvent.setup();
            render(<TestAccordion type="single" collapsible />);

            await user.tab();
            await user.keyboard('{ArrowDown}');
            expect(screen.getByRole('button', { name: 'Second' })).toHaveFocus();

            await user.keyboard('{ArrowUp}');
            expect(screen.getByRole('button', { name: 'First' })).toHaveFocus();
        });

        it('skips the disabled trigger and jumps with Home and End', async () => {
            const user = userEvent.setup();
            render(<TestAccordion type="single" collapsible />);

            await user.tab();
            await user.keyboard('{End}');
            expect(screen.getByRole('button', { name: 'Second' })).toHaveFocus();

            await user.keyboard('{Home}');
            expect(screen.getByRole('button', { name: 'First' })).toHaveFocus();
        });
    });

    describe('accessibility', () => {
        it('renders each trigger inside a heading', () => {
            render(<TestAccordion type="single" collapsible />);

            expect(screen.getAllByRole('heading')).toHaveLength(3);
        });

        it('labels the open content with its trigger', () => {
            render(<TestAccordion type="single" collapsible defaultValue="one" />);

            expect(screen.getByRole('region', { name: 'First' })).toHaveTextContent('First answer');
        });

        it('exposes the open and closed state', async () => {
            const user = userEvent.setup();
            render(<TestAccordion type="single" collapsible />);
            const trigger = screen.getByRole('button', { name: 'First' });

            expect(trigger).toHaveAttribute('data-state', 'closed');

            await user.click(trigger);
            expect(trigger).toHaveAttribute('data-state', 'open');
            expect(screen.getByRole('region', { name: 'First' })).toHaveAttribute('data-state', 'open');
        });

        it('has no axe violations', async () => {
            const { container } = render(<TestAccordion type="single" collapsible defaultValue="one" />);

            expect(await axe(container)).toHaveNoViolations();
        });
    });

    describe('size', () => {
        it('uses the md size by default', () => {
            const { container } = render(<TestAccordion type="single" collapsible />);

            expect(container.firstElementChild).toHaveClass(
                '[&_[data-slot=accordion-trigger]]:min-h-12',
                '[&_[data-slot=accordion-trigger]]:text-base',
            );
            expect(defaultSize).toBe('md');
        });

        it.each(ACCORDION_SIZES)('applies size "%s"', size => {
            const { container } = render(<TestAccordion type="single" collapsible size={size} />);

            expect(container.firstElementChild).toHaveClass(...classList(sizeClasses[size]));
        });
    });

    describe('customization', () => {
        it('sets a data-slot on every part', () => {
            const { container } = render(<TestAccordion type="single" collapsible defaultValue="one" />);

            expect(container.firstElementChild).toHaveAttribute('data-slot', 'accordion');
            expect(screen.getByRole('button', { name: 'First' })).toHaveAttribute('data-slot', 'accordion-trigger');
            expect(screen.getAllByRole('heading')[0]).toHaveAttribute('data-slot', 'accordion-header');
            expect(screen.getByRole('region', { name: 'First' })).toHaveAttribute('data-slot', 'accordion-content');
        });

        it('shows a pointer cursor on the trigger', () => {
            render(<TestAccordion type="single" collapsible />);

            expect(screen.getByRole('button', { name: 'First' })).toHaveClass('cursor-pointer');
        });

        it('lets className override the defaults', () => {
            const { container } = render(
                <Accordion type="single" collapsible defaultValue="one" className="gap-6">
                    <AccordionItem value="one" className="rounded-xl">
                        <AccordionTrigger className="py-6">First</AccordionTrigger>
                        <AccordionContent className="pb-8">First answer</AccordionContent>
                    </AccordionItem>
                </Accordion>,
            );

            expect(container.firstElementChild).toHaveClass('gap-6');
            expect(container.firstElementChild).not.toHaveClass('gap-2');
            expect(screen.getByRole('button', { name: 'First' })).toHaveClass('py-6');
            expect(screen.getByRole('button', { name: 'First' })).not.toHaveClass('py-2');
            expect(screen.getByText('First answer')).toHaveClass('pb-8');
            expect(screen.getByText('First answer')).not.toHaveClass('pb-4');
        });
    });
});
