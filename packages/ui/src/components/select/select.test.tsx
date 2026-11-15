import type { ComponentProps } from 'react';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';

import { Label } from '@/components/label/label';

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectSeparator,
    SelectTrigger,
    SelectValue,
} from './select';
import { defaultSize, SELECT_SIZES, sizeClasses } from './select.variants';

type TestSelectProps = Pick<ComponentProps<typeof SelectTrigger>, 'size' | 'className' | 'aria-invalid'> &
    Pick<ComponentProps<typeof Select>, 'onValueChange' | 'disabled'>;

function TestSelect({ onValueChange, disabled, size, className, 'aria-invalid': ariaInvalid }: TestSelectProps) {
    return (
        <Select onValueChange={onValueChange} disabled={disabled}>
            <SelectTrigger aria-label="Fruit" size={size} className={className} aria-invalid={ariaInvalid}>
                <SelectValue placeholder="Select a fruit" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="apple">Apple</SelectItem>
                <SelectItem value="banana">Banana</SelectItem>
                <SelectItem value="orange" disabled>
                    Orange
                </SelectItem>
            </SelectContent>
        </Select>
    );
}

describe('Select', () => {
    describe('behavior', () => {
        it('shows the placeholder until an option is chosen', () => {
            render(<TestSelect />);

            expect(screen.getByRole('combobox', { name: 'Fruit' })).toHaveTextContent('Select a fruit');
        });

        it('opens on click and lists the options', async () => {
            const user = userEvent.setup();
            render(<TestSelect />);

            await user.click(screen.getByRole('combobox', { name: 'Fruit' }));

            expect(await screen.findByRole('listbox')).toBeInTheDocument();
            expect(screen.getAllByRole('option')).toHaveLength(3);
        });

        it('selects an option, shows it and closes the list', async () => {
            const user = userEvent.setup();
            const onValueChange = jest.fn();
            render(<TestSelect onValueChange={onValueChange} />);

            await user.click(screen.getByRole('combobox', { name: 'Fruit' }));
            await user.click(await screen.findByRole('option', { name: 'Banana' }));

            expect(onValueChange).toHaveBeenCalledWith('banana');
            expect(screen.getByRole('combobox', { name: 'Fruit' })).toHaveTextContent('Banana');
            expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
        });

        it('can be used with the keyboard', async () => {
            const user = userEvent.setup();
            const onValueChange = jest.fn();
            render(<TestSelect onValueChange={onValueChange} />);

            await user.tab();
            await user.keyboard('{Enter}');
            await screen.findByRole('listbox');
            await user.keyboard('{ArrowDown}{Enter}');

            expect(onValueChange).toHaveBeenCalledWith('banana');
        });

        it('closes with Escape without changing the value', async () => {
            const user = userEvent.setup();
            const onValueChange = jest.fn();
            render(<TestSelect onValueChange={onValueChange} />);

            await user.click(screen.getByRole('combobox', { name: 'Fruit' }));
            await screen.findByRole('listbox');
            await user.keyboard('{Escape}');

            expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
            expect(onValueChange).not.toHaveBeenCalled();
        });

        it('does not open when disabled', async () => {
            const user = userEvent.setup();
            render(<TestSelect disabled />);

            await user.click(screen.getByRole('combobox', { name: 'Fruit' }));

            expect(screen.getByRole('combobox', { name: 'Fruit' })).toBeDisabled();
            expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
        });

        it('does not select a disabled option', async () => {
            const user = userEvent.setup();
            const onValueChange = jest.fn();
            render(<TestSelect onValueChange={onValueChange} />);

            await user.click(screen.getByRole('combobox', { name: 'Fruit' }));
            await user.click(await screen.findByRole('option', { name: 'Orange' }));

            expect(onValueChange).not.toHaveBeenCalled();
        });
    });

    describe('value and forms', () => {
        it('shows the default value', () => {
            render(
                <Select defaultValue="apple">
                    <SelectTrigger aria-label="Fruit">
                        <SelectValue placeholder="Select a fruit" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="apple">Apple</SelectItem>
                    </SelectContent>
                </Select>,
            );

            expect(screen.getByRole('combobox', { name: 'Fruit' })).toHaveTextContent('Apple');
        });

        it('submits the chosen value with a native form', () => {
            render(
                <form data-testid="form">
                    <Select name="fruit" defaultValue="apple">
                        <SelectTrigger aria-label="Fruit">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="apple">Apple</SelectItem>
                        </SelectContent>
                    </Select>
                </form>,
            );

            expect(new FormData(screen.getByTestId('form')).get('fruit')).toBe('apple');
        });
    });

    describe('parts', () => {
        it('renders groups with labels and separators', async () => {
            const user = userEvent.setup();
            render(
                <Select>
                    <SelectTrigger aria-label="Food">
                        <SelectValue placeholder="Select a food" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Fruits</SelectLabel>
                            <SelectItem value="apple">Apple</SelectItem>
                        </SelectGroup>
                        <SelectSeparator data-testid="separator" />
                        <SelectGroup>
                            <SelectLabel>Vegetables</SelectLabel>
                            <SelectItem value="carrot">Carrot</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>,
            );

            await user.click(screen.getByRole('combobox', { name: 'Food' }));

            expect(await screen.findByText('Fruits')).toHaveAttribute('data-slot', 'select-label');
            expect(screen.getByText('Vegetables')).toBeInTheDocument();
            expect(screen.getByTestId('separator')).toHaveAttribute('data-slot', 'select-separator');
            expect(screen.getAllByRole('group')).toHaveLength(2);
        });

        it('lets className customize the menu', async () => {
            const user = userEvent.setup();
            render(
                <Select>
                    <SelectTrigger aria-label="Fruit">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="w-96">
                        <SelectItem value="apple">Apple</SelectItem>
                    </SelectContent>
                </Select>,
            );

            await user.click(screen.getByRole('combobox', { name: 'Fruit' }));

            expect(await screen.findByRole('listbox')).toHaveClass('w-96');
            expect(screen.getByRole('listbox')).toHaveAttribute('data-slot', 'select-content');
        });
    });

    describe('accessibility', () => {
        it('is found by its label', () => {
            render(
                <>
                    <Label htmlFor="fruit">Favorite fruit</Label>
                    <Select>
                        <SelectTrigger id="fruit">
                            <SelectValue placeholder="Select a fruit" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="apple">Apple</SelectItem>
                        </SelectContent>
                    </Select>
                </>,
            );

            expect(screen.getByLabelText('Favorite fruit')).toBe(screen.getByRole('combobox'));
        });

        it('exposes the invalid state', () => {
            render(<TestSelect aria-invalid />);

            expect(screen.getByRole('combobox', { name: 'Fruit' })).toBeInvalid();
        });

        it('has no axe violations', async () => {
            const { container } = render(<TestSelect />);

            expect(await axe(container)).toHaveNoViolations();
        });
    });

    describe('size', () => {
        it('uses the md size by default', () => {
            render(<TestSelect />);

            expect(screen.getByRole('combobox', { name: 'Fruit' })).toHaveClass('h-12', 'px-4');
            expect(defaultSize).toBe('md');
        });

        it.each(SELECT_SIZES)('applies size "%s"', size => {
            render(<TestSelect size={size} />);

            expect(screen.getByRole('combobox', { name: 'Fruit' })).toHaveClass(sizeClasses[size]);
        });
    });

    describe('customization', () => {
        it('lets className override the height', () => {
            render(<TestSelect className="h-20" />);

            const trigger = screen.getByRole('combobox', { name: 'Fruit' });
            expect(trigger).toHaveClass('h-20');
            expect(trigger).not.toHaveClass('h-12');
        });

        it('marks the trigger with a data-slot', () => {
            render(<TestSelect />);

            expect(screen.getByRole('combobox', { name: 'Fruit' })).toHaveAttribute('data-slot', 'select-trigger');
        });
    });
});
