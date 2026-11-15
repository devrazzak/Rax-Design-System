import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';

import { Checkbox } from '@/components/checkbox/checkbox';
import { Input } from '@/components/input/input';
import { RadioGroup, RadioGroupItem } from '@/components/radio-group/radio-group';

import {
    Field,
    FieldContent,
    FieldDescription,
    FieldError,
    FieldGroup,
    FieldLabel,
    FieldLegend,
    FieldSet,
} from './field';
import { defaultOrientation, FIELD_ORIENTATIONS, orientationClasses } from './field.variants';

describe('Field', () => {
    describe('label', () => {
        it('names the control it points to', () => {
            render(
                <Field>
                    <FieldLabel htmlFor="email">Email</FieldLabel>
                    <Input id="email" />
                </Field>,
            );

            expect(screen.getByRole('textbox', { name: 'Email' })).toBeInTheDocument();
        });

        it('focuses the control when the label is clicked', async () => {
            const user = userEvent.setup();
            render(
                <Field>
                    <FieldLabel htmlFor="email">Email</FieldLabel>
                    <Input id="email" />
                </Field>,
            );

            await user.click(screen.getByText('Email'));

            expect(screen.getByRole('textbox', { name: 'Email' })).toHaveFocus();
        });

        it('sets data-slot on the label', () => {
            render(<FieldLabel htmlFor="email">Email</FieldLabel>);

            expect(screen.getByText('Email')).toHaveAttribute('data-slot', 'field-label');
        });
    });

    describe('description', () => {
        it('describes the control through aria-describedby', () => {
            render(
                <Field>
                    <FieldLabel htmlFor="email">Email</FieldLabel>
                    <Input id="email" aria-describedby="email-hint" />
                    <FieldDescription id="email-hint">We never share your email.</FieldDescription>
                </Field>,
            );

            expect(screen.getByRole('textbox', { name: 'Email' })).toHaveAccessibleDescription(
                'We never share your email.',
            );
        });
    });

    describe('error', () => {
        it('shows the message as an alert', () => {
            render(<FieldError>Enter a valid email.</FieldError>);

            expect(screen.getByRole('alert')).toHaveTextContent('Enter a valid email.');
        });

        it('renders nothing without children', () => {
            render(<FieldError>{undefined}</FieldError>);

            expect(screen.queryByRole('alert')).not.toBeInTheDocument();
        });

        it('describes the control through aria-describedby', () => {
            render(
                <Field data-invalid>
                    <FieldLabel htmlFor="email">Email</FieldLabel>
                    <Input id="email" aria-invalid aria-describedby="email-error" />
                    <FieldError id="email-error">Enter a valid email.</FieldError>
                </Field>,
            );

            expect(screen.getByRole('textbox', { name: 'Email' })).toHaveAccessibleDescription('Enter a valid email.');
        });

        it('merges a custom className and sets data-slot', () => {
            render(<FieldError className="custom-class">Required.</FieldError>);

            expect(screen.getByRole('alert')).toHaveClass('custom-class');
            expect(screen.getByRole('alert')).toHaveAttribute('data-slot', 'field-error');
        });
    });

    describe('orientation', () => {
        it('is vertical by default', () => {
            render(<Field data-testid="field" />);

            expect(defaultOrientation).toBe('vertical');
            expect(screen.getByTestId('field')).toHaveAttribute('data-orientation', 'vertical');
            expect(screen.getByTestId('field')).toHaveClass('flex-col');
        });

        it.each(FIELD_ORIENTATIONS)('applies the %s classes', orientation => {
            render(<Field data-testid="field" orientation={orientation} />);

            const classes = orientationClasses[orientation].split(' ').filter(name => !name.includes('['));
            expect(screen.getByTestId('field')).toHaveAttribute('data-orientation', orientation);
            expect(screen.getByTestId('field')).toHaveClass(...classes);
        });
    });

    describe('invalid', () => {
        it('passes data-invalid through to the field', () => {
            render(<Field data-testid="field" data-invalid />);

            expect(screen.getByTestId('field')).toHaveAttribute('data-invalid', 'true');
        });
    });

    describe('horizontal controls', () => {
        it('toggles a checkbox from its label', async () => {
            const user = userEvent.setup();
            render(
                <Field orientation="horizontal">
                    <Checkbox id="terms" />
                    <FieldContent>
                        <FieldLabel htmlFor="terms">Accept terms</FieldLabel>
                        <FieldDescription>You agree to the terms.</FieldDescription>
                    </FieldContent>
                </Field>,
            );

            await user.click(screen.getByText('Accept terms'));

            expect(screen.getByRole('checkbox', { name: 'Accept terms' })).toBeChecked();
        });
    });

    describe('grouping', () => {
        it('names a fieldset by its legend', () => {
            render(
                <FieldSet>
                    <FieldLegend>Plan</FieldLegend>
                    <RadioGroup>
                        <RadioGroupItem value="free" aria-label="Free" />
                    </RadioGroup>
                </FieldSet>,
            );

            expect(screen.getByRole('group', { name: 'Plan' })).toBeInTheDocument();
        });

        it('sets data-slot on every part', () => {
            render(
                <FieldGroup data-testid="group">
                    <FieldSet data-testid="set">
                        <FieldLegend data-testid="legend">Plan</FieldLegend>
                    </FieldSet>
                    <Field data-testid="field">
                        <FieldContent data-testid="content">
                            <FieldDescription data-testid="description">Hint</FieldDescription>
                        </FieldContent>
                    </Field>
                </FieldGroup>,
            );

            expect(screen.getByTestId('group')).toHaveAttribute('data-slot', 'field-group');
            expect(screen.getByTestId('set')).toHaveAttribute('data-slot', 'field-set');
            expect(screen.getByTestId('legend')).toHaveAttribute('data-slot', 'field-legend');
            expect(screen.getByTestId('field')).toHaveAttribute('data-slot', 'field');
            expect(screen.getByTestId('content')).toHaveAttribute('data-slot', 'field-content');
            expect(screen.getByTestId('description')).toHaveAttribute('data-slot', 'field-description');
        });

        it('merges a custom className on the field', () => {
            render(<Field data-testid="field" className="custom-class" />);

            expect(screen.getByTestId('field')).toHaveClass('custom-class');
        });
    });

    describe('accessibility', () => {
        it('has no axe violations', async () => {
            const { container } = render(
                <FieldGroup>
                    <Field data-invalid>
                        <FieldLabel htmlFor="email">Email</FieldLabel>
                        <Input id="email" aria-invalid aria-describedby="email-error" />
                        <FieldError id="email-error">Enter a valid email.</FieldError>
                    </Field>
                    <FieldSet>
                        <FieldLegend>Plan</FieldLegend>
                        <RadioGroup>
                            <Field orientation="horizontal">
                                <RadioGroupItem id="free" value="free" />
                                <FieldLabel htmlFor="free">Free</FieldLabel>
                            </Field>
                        </RadioGroup>
                    </FieldSet>
                </FieldGroup>,
            );

            expect(await axe(container)).toHaveNoViolations();
        });
    });
});
