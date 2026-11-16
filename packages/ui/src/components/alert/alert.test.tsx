import { InfoIcon } from '@/icons';
import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';

import { Alert, AlertAction, AlertDescription, AlertTitle } from './alert';
import { ALERT_VARIANTS, defaultVariants, variantClasses } from './alert.variants';

describe('Alert', () => {
    describe('behavior', () => {
        it('renders the title and the description', () => {
            render(
                <Alert>
                    <AlertTitle>Heads up</AlertTitle>
                    <AlertDescription>You can change this later.</AlertDescription>
                </Alert>,
            );

            expect(screen.getByText('Heads up')).toBeInTheDocument();
            expect(screen.getByText('You can change this later.')).toBeInTheDocument();
        });

        it('renders an icon next to the text', () => {
            render(
                <Alert>
                    <InfoIcon data-testid="icon" />
                    <AlertTitle>Heads up</AlertTitle>
                </Alert>,
            );

            expect(screen.getByTestId('icon')).toBeInTheDocument();
        });

        it('renders every part as a div', () => {
            render(
                <Alert data-testid="alert">
                    <AlertTitle data-testid="title">Title</AlertTitle>
                    <AlertDescription data-testid="description">Description</AlertDescription>
                    <AlertAction data-testid="action">Action</AlertAction>
                </Alert>,
            );

            ['alert', 'title', 'description', 'action'].forEach(id => {
                expect(screen.getByTestId(id).tagName).toBe('DIV');
            });
        });

        it('passes native props to the root element', () => {
            render(<Alert id="saved">Saved</Alert>);

            expect(screen.getByRole('alert')).toHaveAttribute('id', 'saved');
        });

        it('renders an action inside the alert', () => {
            render(
                <Alert>
                    <AlertTitle>Post deleted</AlertTitle>
                    <AlertAction>
                        <button type="button">Undo</button>
                    </AlertAction>
                </Alert>,
            );

            const action = screen.getByRole('button', { name: 'Undo' }).parentElement;
            expect(screen.getByRole('alert')).toContainElement(action);
            expect(action).toHaveClass('absolute', 'top-3', 'right-3');
        });

        it('makes room for the action', () => {
            render(<Alert>Content</Alert>);

            expect(screen.getByRole('alert')).toHaveClass('has-data-[slot=alert-action]:pr-18');
        });

        it('puts an icon in its own column', () => {
            render(<Alert>Content</Alert>);

            expect(screen.getByRole('alert')).toHaveClass('has-[>svg]:grid-cols-[auto_1fr]');
        });
    });

    describe('accessibility', () => {
        it('has the alert role by default', () => {
            render(<Alert>Saved</Alert>);

            expect(screen.getByRole('alert')).toBeInTheDocument();
        });

        it('lets the role be changed, e.g. to status for a calm message', () => {
            render(<Alert role="status">Saved</Alert>);

            expect(screen.getByRole('status')).toBeInTheDocument();
            expect(screen.queryByRole('alert')).not.toBeInTheDocument();
        });

        it('has no axe violations', async () => {
            const { container } = render(
                <Alert>
                    <InfoIcon />
                    <AlertTitle>Heads up</AlertTitle>
                    <AlertDescription>You can change this later.</AlertDescription>
                </Alert>,
            );

            expect(await axe(container)).toHaveNoViolations();
        });

        it.each(ALERT_VARIANTS)('has no axe violations with variant "%s"', async variant => {
            const { container } = render(
                <Alert variant={variant}>
                    <AlertTitle>Title</AlertTitle>
                    <AlertDescription>Description</AlertDescription>
                </Alert>,
            );

            expect(await axe(container)).toHaveNoViolations();
        });
    });

    describe('variant', () => {
        it('uses the default variant by default', () => {
            render(<Alert>Saved</Alert>);

            const alert = screen.getByRole('alert');
            expect(defaultVariants.variant).toBe('default');
            expect(alert).toHaveAttribute('data-variant', 'default');
            expect(alert).toHaveClass('bg-card', 'text-card-foreground');
        });

        it.each(ALERT_VARIANTS)('applies variant "%s"', variant => {
            render(<Alert variant={variant}>Saved</Alert>);

            const alert = screen.getByRole('alert');
            expect(alert).toHaveAttribute('data-variant', variant);
            expect(alert).toHaveClass(variantClasses[variant]);
        });

        it.each([
            ['destructive', 'text-destructive'],
            ['info', 'text-info'],
            ['warning', 'text-warning'],
        ] as const)('colors the text of "%s" and keeps the card background', (variant, textClass) => {
            render(<Alert variant={variant}>Saved</Alert>);

            expect(screen.getByRole('alert')).toHaveClass('bg-card', textClass);
        });

        it.each([
            ['destructive-subtle', 'bg-destructive-subtle', 'text-destructive-subtle-foreground'],
            ['info-subtle', 'bg-info-subtle', 'text-info-subtle-foreground'],
            ['warning-subtle', 'bg-warning-subtle', 'text-warning-subtle-foreground'],
        ] as const)('fills "%s" with a tint and hides the border', (variant, backgroundClass, textClass) => {
            render(<Alert variant={variant}>Saved</Alert>);

            expect(screen.getByRole('alert')).toHaveClass('border-transparent', backgroundClass, textClass);
        });

        it.each(ALERT_VARIANTS.filter(variant => variant !== 'default'))(
            'colors the description of "%s" like the alert',
            variant => {
                render(<Alert variant={variant}>Saved</Alert>);

                expect(screen.getByRole('alert').className).toContain('*:data-[slot=alert-description]:text-');
            },
        );
    });

    describe('customization', () => {
        it('sets data-slot on every part', () => {
            render(
                <Alert data-testid="alert">
                    <AlertTitle data-testid="title">Title</AlertTitle>
                    <AlertDescription data-testid="description">Description</AlertDescription>
                    <AlertAction data-testid="action">Action</AlertAction>
                </Alert>,
            );

            expect(screen.getByTestId('alert')).toHaveAttribute('data-slot', 'alert');
            expect(screen.getByTestId('title')).toHaveAttribute('data-slot', 'alert-title');
            expect(screen.getByTestId('description')).toHaveAttribute('data-slot', 'alert-description');
            expect(screen.getByTestId('action')).toHaveAttribute('data-slot', 'alert-action');
        });

        it('has a border, rounded-md corners and a small text size', () => {
            render(<Alert>Saved</Alert>);

            expect(screen.getByRole('alert')).toHaveClass('border', 'rounded-md', 'px-4', 'py-3', 'text-sm');
        });

        it('styles the title and the description', () => {
            render(
                <Alert>
                    <AlertTitle>Title</AlertTitle>
                    <AlertDescription>Description</AlertDescription>
                </Alert>,
            );

            expect(screen.getByText('Title')).toHaveClass('font-medium');
            expect(screen.getByText('Description')).toHaveClass('text-muted-foreground');
        });

        it.each([
            ['Alert', Alert],
            ['AlertTitle', AlertTitle],
            ['AlertDescription', AlertDescription],
            ['AlertAction', AlertAction],
        ])('merges a custom className on %s', (_name, Part) => {
            render(<Part data-testid="part" className="custom-class" />);

            expect(screen.getByTestId('part')).toHaveClass('custom-class');
        });

        it('lets a custom className override the radius', () => {
            render(<Alert className="rounded-none">Saved</Alert>);

            const alert = screen.getByRole('alert');
            expect(alert).toHaveClass('rounded-none');
            expect(alert).not.toHaveClass('rounded-md');
        });

        it('lets a custom className override the padding', () => {
            render(<Alert className="px-6">Saved</Alert>);

            const alert = screen.getByRole('alert');
            expect(alert).toHaveClass('px-6');
            expect(alert).not.toHaveClass('px-4');
        });

        it('lets a custom className move the action', () => {
            render(<AlertAction data-testid="action" className="top-1" />);

            const action = screen.getByTestId('action');
            expect(action).toHaveClass('top-1');
            expect(action).not.toHaveClass('top-3');
        });
    });
});
