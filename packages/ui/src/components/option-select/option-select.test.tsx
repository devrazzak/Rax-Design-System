import type { ComponentProps } from 'react';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';

import { Label } from '@/components/label/label';
import { defaultSize, SELECT_SIZES, sizeClasses } from '@/components/select/select.variants';

import type { OptionSelectOption } from './option-select';
import { OptionSelect } from './option-select';

const OPTIONS: OptionSelectOption[] = [
    { value: 'apple', label: 'Apple' },
    { value: 'banana', label: 'Banana' },
    { value: 'orange', label: 'Orange', disabled: true },
];

function TestOptionSelect(props: Partial<ComponentProps<typeof OptionSelect>>) {
    return <OptionSelect options={OPTIONS} placeholder="Select a fruit" aria-label="Fruit" {...props} />;
}

/** Class names with brackets are long, so tests pass them as a list. */
function classList(classes: string) {
    return classes.split(' ');
}

describe('OptionSelect', () => {
    describe('behavior', () => {
        it('shows the placeholder until an option is chosen', () => {
            render(<TestOptionSelect />);

            expect(screen.getByRole('combobox', { name: 'Fruit' })).toHaveTextContent('Select a fruit');
        });

        it('lists one option for every item in the array', async () => {
            const user = userEvent.setup();
            render(<TestOptionSelect />);

            await user.click(screen.getByRole('combobox', { name: 'Fruit' }));

            expect(await screen.findAllByRole('option')).toHaveLength(OPTIONS.length);
            expect(screen.getByRole('option', { name: 'Apple' })).toBeInTheDocument();
            expect(screen.getByRole('option', { name: 'Banana' })).toBeInTheDocument();
        });

        it('calls onValueChange with the value, not the label', async () => {
            const user = userEvent.setup();
            const onValueChange = jest.fn();
            render(<TestOptionSelect onValueChange={onValueChange} />);

            await user.click(screen.getByRole('combobox', { name: 'Fruit' }));
            await user.click(await screen.findByRole('option', { name: 'Banana' }));

            expect(onValueChange).toHaveBeenCalledWith('banana');
            expect(screen.getByRole('combobox', { name: 'Fruit' })).toHaveTextContent('Banana');
        });

        it('shows the label of the default value', () => {
            render(<TestOptionSelect defaultValue="banana" />);

            expect(screen.getByRole('combobox', { name: 'Fruit' })).toHaveTextContent('Banana');
        });

        it('follows the value when it is controlled', async () => {
            const user = userEvent.setup();
            render(<TestOptionSelect value="apple" onValueChange={() => undefined} />);

            await user.click(screen.getByRole('combobox', { name: 'Fruit' }));
            await user.click(await screen.findByRole('option', { name: 'Banana' }));

            expect(screen.getByRole('combobox', { name: 'Fruit' })).toHaveTextContent('Apple');
        });

        it('does not select a disabled option', async () => {
            const user = userEvent.setup();
            const onValueChange = jest.fn();
            render(<TestOptionSelect onValueChange={onValueChange} />);

            await user.click(screen.getByRole('combobox', { name: 'Fruit' }));
            await user.click(await screen.findByRole('option', { name: 'Orange' }));

            expect(screen.getByRole('option', { name: 'Orange' })).toHaveAttribute('aria-disabled', 'true');
            expect(onValueChange).not.toHaveBeenCalled();
        });

        it('does not open when disabled', async () => {
            const user = userEvent.setup();
            render(<TestOptionSelect disabled />);

            await user.click(screen.getByRole('combobox', { name: 'Fruit' }));

            expect(screen.getByRole('combobox', { name: 'Fruit' })).toBeDisabled();
            expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
        });

        it('lists no options for an empty array', async () => {
            const user = userEvent.setup();
            render(<TestOptionSelect options={[]} />);

            await user.click(screen.getByRole('combobox', { name: 'Fruit' }));

            expect(screen.queryAllByRole('option')).toHaveLength(0);
        });
    });

    describe('size', () => {
        it(`uses the ${defaultSize} size by default`, () => {
            render(<TestOptionSelect />);

            expect(screen.getByRole('combobox', { name: 'Fruit' })).toHaveClass(...classList(sizeClasses[defaultSize]));
        });

        it.each(SELECT_SIZES)('applies the %s size classes', size => {
            render(<TestOptionSelect size={size} />);

            expect(screen.getByRole('combobox', { name: 'Fruit' })).toHaveClass(...classList(sizeClasses[size]));
        });
    });

    describe('customization', () => {
        it('puts className on the trigger and lets it override the defaults', () => {
            render(<TestOptionSelect className="w-40" />);

            expect(screen.getByRole('combobox', { name: 'Fruit' })).toHaveClass('w-40');
        });

        it('passes the id to the trigger, so a label can point at it', () => {
            render(
                <>
                    <Label htmlFor="fruit-select">Favorite fruit</Label>
                    <OptionSelect id="fruit-select" options={OPTIONS} />
                </>,
            );

            expect(screen.getByRole('combobox', { name: 'Favorite fruit' })).toHaveAttribute('id', 'fruit-select');
        });

        it('passes the name to the form', () => {
            const { container } = render(<TestOptionSelect name="fruit" defaultValue="apple" />);

            expect(container.querySelector('select[name="fruit"]')).toBeInTheDocument();
        });
    });

    describe('accessibility', () => {
        it('marks the trigger invalid with aria-invalid', () => {
            render(<TestOptionSelect aria-invalid />);

            expect(screen.getByRole('combobox', { name: 'Fruit' })).toBeInvalid();
        });

        it('connects the trigger to a description', () => {
            render(
                <>
                    <TestOptionSelect aria-describedby="fruit-hint" />
                    <p id="fruit-hint">Pick one</p>
                </>,
            );

            expect(screen.getByRole('combobox', { name: 'Fruit' })).toHaveAccessibleDescription('Pick one');
        });

        it('has no axe violations', async () => {
            const { container } = render(<TestOptionSelect />);

            expect(await axe(container)).toHaveNoViolations();
        });
    });
});
