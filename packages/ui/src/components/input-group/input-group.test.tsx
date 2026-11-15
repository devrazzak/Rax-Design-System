import { SearchIcon } from '@/icons';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';

import { Field, FieldLabel } from '@/components/field/field';

import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from './input-group';
import { defaultSize, INPUT_GROUP_SIZES, sizeClasses } from './input-group.variants';

describe('InputGroup', () => {
    describe('input', () => {
        it('accepts typed text', async () => {
            const user = userEvent.setup();
            render(
                <InputGroup>
                    <InputGroupInput aria-label="Search" />
                </InputGroup>,
            );

            await user.type(screen.getByRole('textbox', { name: 'Search' }), 'hello');

            expect(screen.getByRole('textbox', { name: 'Search' })).toHaveValue('hello');
        });

        it('reports changes through onChange', async () => {
            const user = userEvent.setup();
            const onChange = jest.fn();
            render(
                <InputGroup>
                    <InputGroupInput aria-label="Search" onChange={onChange} />
                </InputGroup>,
            );

            await user.type(screen.getByRole('textbox', { name: 'Search' }), 'ab');

            expect(onChange).toHaveBeenCalledTimes(2);
        });

        it('shows the placeholder', () => {
            render(
                <InputGroup>
                    <InputGroupInput aria-label="Search" placeholder="Search..." />
                </InputGroup>,
            );

            expect(screen.getByPlaceholderText('Search...')).toBeInTheDocument();
        });

        it('passes the input type through', () => {
            render(
                <InputGroup>
                    <InputGroupInput aria-label="Email" type="email" />
                </InputGroup>,
            );

            expect(screen.getByRole('textbox', { name: 'Email' })).toHaveAttribute('type', 'email');
        });

        it('is labelled by a Field label', async () => {
            const user = userEvent.setup();
            render(
                <Field>
                    <FieldLabel htmlFor="site">Website</FieldLabel>
                    <InputGroup>
                        <InputGroupInput id="site" />
                    </InputGroup>
                </Field>,
            );

            await user.click(screen.getByText('Website'));

            expect(screen.getByRole('textbox', { name: 'Website' })).toHaveFocus();
        });
    });

    describe('addons', () => {
        it('renders text and icons beside the input', () => {
            render(
                <InputGroup>
                    <InputGroupAddon>https://</InputGroupAddon>
                    <InputGroupInput aria-label="Website" />
                    <InputGroupAddon data-testid="icon-addon">
                        <SearchIcon />
                    </InputGroupAddon>
                </InputGroup>,
            );

            expect(screen.getByText('https://')).toBeInTheDocument();
            expect(screen.getByTestId('icon-addon').querySelector('svg')).toBeInTheDocument();
        });

        it('keeps addons before and after the input in DOM order', () => {
            render(
                <InputGroup data-testid="group">
                    <InputGroupAddon>$</InputGroupAddon>
                    <InputGroupInput aria-label="Amount" />
                    <InputGroupAddon>USD</InputGroupAddon>
                </InputGroup>,
            );

            const text = screen.getByTestId('group').textContent;
            expect(text).toBe('$USD');
            expect(screen.getByTestId('group').children[0]).toHaveTextContent('$');
            expect(screen.getByTestId('group').children[2]).toHaveTextContent('USD');
        });
    });

    describe('button', () => {
        it('calls onClick', async () => {
            const user = userEvent.setup();
            const onClick = jest.fn();
            render(
                <InputGroup>
                    <InputGroupInput aria-label="Link" />
                    <InputGroupButton onClick={onClick}>Copy</InputGroupButton>
                </InputGroup>,
            );

            await user.click(screen.getByRole('button', { name: 'Copy' }));

            expect(onClick).toHaveBeenCalledTimes(1);
        });

        it('is type="button" so it does not submit a form', async () => {
            const user = userEvent.setup();
            const onSubmit = jest.fn((event: React.SyntheticEvent) => {
                event.preventDefault();
            });
            render(
                <form onSubmit={onSubmit}>
                    <InputGroup>
                        <InputGroupInput aria-label="Link" />
                        <InputGroupButton>Copy</InputGroupButton>
                    </InputGroup>
                </form>,
            );

            await user.click(screen.getByRole('button', { name: 'Copy' }));

            expect(screen.getByRole('button', { name: 'Copy' })).toHaveAttribute('type', 'button');
            expect(onSubmit).not.toHaveBeenCalled();
        });

        it('does not click when disabled', async () => {
            const user = userEvent.setup();
            const onClick = jest.fn();
            render(
                <InputGroup>
                    <InputGroupInput aria-label="Link" />
                    <InputGroupButton disabled onClick={onClick}>
                        Copy
                    </InputGroupButton>
                </InputGroup>,
            );

            await user.click(screen.getByRole('button', { name: 'Copy' }));

            expect(onClick).not.toHaveBeenCalled();
        });
    });

    describe('invalid and disabled', () => {
        it('passes aria-invalid to the input', () => {
            render(
                <InputGroup>
                    <InputGroupInput aria-label="Search" aria-invalid />
                </InputGroup>,
            );

            expect(screen.getByRole('textbox', { name: 'Search' })).toHaveAttribute('aria-invalid', 'true');
        });

        it('disables the input', () => {
            render(
                <InputGroup>
                    <InputGroupInput aria-label="Search" disabled />
                </InputGroup>,
            );

            expect(screen.getByRole('textbox', { name: 'Search' })).toBeDisabled();
        });
    });

    describe('sizes', () => {
        it('uses the md size by default', () => {
            render(<InputGroup data-testid="group" />);

            expect(defaultSize).toBe('md');
            expect(screen.getByTestId('group')).toHaveClass('h-12', 'px-4', 'text-base');
        });

        it.each(INPUT_GROUP_SIZES)('applies the %s size classes', size => {
            render(<InputGroup data-testid="group" size={size} />);

            // Only the plain classes; the icon size rule is a long arbitrary selector.
            const classes = sizeClasses[size].split(' ').filter(name => !name.includes('['));
            expect(screen.getByTestId('group')).toHaveClass(...classes);
        });
    });

    describe('customization', () => {
        it('merges a custom className on the group and the input', () => {
            render(
                <InputGroup data-testid="group" className="custom-group">
                    <InputGroupInput aria-label="Search" className="custom-input" />
                </InputGroup>,
            );

            expect(screen.getByTestId('group')).toHaveClass('custom-group');
            expect(screen.getByRole('textbox', { name: 'Search' })).toHaveClass('custom-input');
        });

        it('sets data-slot on every part', () => {
            render(
                <InputGroup data-testid="group">
                    <InputGroupAddon data-testid="addon">$</InputGroupAddon>
                    <InputGroupInput aria-label="Amount" />
                    <InputGroupButton>Go</InputGroupButton>
                </InputGroup>,
            );

            expect(screen.getByTestId('group')).toHaveAttribute('data-slot', 'input-group');
            expect(screen.getByTestId('addon')).toHaveAttribute('data-slot', 'input-group-addon');
            expect(screen.getByRole('textbox', { name: 'Amount' })).toHaveAttribute('data-slot', 'input-group-input');
            expect(screen.getByRole('button', { name: 'Go' })).toHaveAttribute('data-slot', 'input-group-button');
        });
    });

    describe('accessibility', () => {
        it('has no axe violations', async () => {
            const { container } = render(
                <Field>
                    <FieldLabel htmlFor="site">Website</FieldLabel>
                    <InputGroup>
                        <InputGroupAddon>https://</InputGroupAddon>
                        <InputGroupInput id="site" />
                        <InputGroupButton aria-label="Copy">
                            <SearchIcon />
                        </InputGroupButton>
                    </InputGroup>
                </Field>,
            );

            expect(await axe(container)).toHaveNoViolations();
        });
    });
});
