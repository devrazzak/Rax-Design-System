import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';

import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './card';
import {
    CARD_PADDINGS,
    CARD_RADII,
    defaultPadding,
    defaultRadius,
    paddingClasses,
    radiusClasses,
} from './card.variants';

describe('Card', () => {
    describe('behavior', () => {
        it('renders all parts with their content', () => {
            render(
                <Card>
                    <CardHeader>
                        <CardTitle>Title</CardTitle>
                        <CardDescription>Description</CardDescription>
                    </CardHeader>
                    <CardContent>Content</CardContent>
                    <CardFooter>Footer</CardFooter>
                </Card>,
            );

            expect(screen.getByText('Title')).toBeInTheDocument();
            expect(screen.getByText('Description')).toBeInTheDocument();
            expect(screen.getByText('Content')).toBeInTheDocument();
            expect(screen.getByText('Footer')).toBeInTheDocument();
        });

        it('renders every part as a div', () => {
            render(
                <Card data-testid="card">
                    <CardHeader data-testid="header">
                        <CardTitle data-testid="title">Title</CardTitle>
                        <CardDescription data-testid="description">Description</CardDescription>
                        <CardAction data-testid="action">Action</CardAction>
                    </CardHeader>
                    <CardContent data-testid="content">Content</CardContent>
                    <CardFooter data-testid="footer">Footer</CardFooter>
                </Card>,
            );

            ['card', 'header', 'title', 'description', 'action', 'content', 'footer'].forEach(id => {
                expect(screen.getByTestId(id).tagName).toBe('DIV');
            });
        });

        it('passes native props to the root element', () => {
            render(
                <Card id="donation" aria-label="Donation">
                    Content
                </Card>,
            );

            expect(screen.getByLabelText('Donation')).toHaveAttribute('id', 'donation');
        });

        it('places the action inside the header', () => {
            render(
                <CardHeader data-testid="header">
                    <CardTitle>Title</CardTitle>
                    <CardAction>
                        <button type="button">Edit</button>
                    </CardAction>
                </CardHeader>,
            );

            const header = screen.getByTestId('header');
            const action = screen.getByRole('button', { name: 'Edit' }).parentElement;
            expect(action).toHaveAttribute('data-slot', 'card-action');
            expect(header).toContainElement(action);
            expect(action).toHaveClass('col-start-2', 'row-start-1', 'justify-self-end');
        });

        it('lets the header use two columns when it has an action', () => {
            render(<CardHeader data-testid="header" />);

            expect(screen.getByTestId('header')).toHaveClass('has-data-[slot=card-action]:grid-cols-[1fr_auto]');
        });

        it('removes the bottom padding of the card when it has a footer', () => {
            render(<Card data-testid="card" />);

            expect(screen.getByTestId('card')).toHaveClass('has-data-[slot=card-footer]:pb-0');
        });

        it('draws the footer flush with a top border and a muted background', () => {
            render(<CardFooter data-testid="footer">Footer</CardFooter>);

            expect(screen.getByTestId('footer')).toHaveClass(
                'flex',
                'items-center',
                'border-t',
                'bg-muted',
                'p-(--card-spacing)',
            );
        });
    });

    describe('accessibility', () => {
        it('has no axe violations', async () => {
            const { container } = render(
                <Card>
                    <CardHeader>
                        <CardTitle>Title</CardTitle>
                        <CardDescription>Description</CardDescription>
                        <CardAction>
                            <button type="button">Edit</button>
                        </CardAction>
                    </CardHeader>
                    <CardContent>Content</CardContent>
                    <CardFooter>Footer</CardFooter>
                </Card>,
            );

            expect(await axe(container)).toHaveNoViolations();
        });
    });

    describe('padding', () => {
        it('uses the md padding by default', () => {
            render(<Card data-testid="card" />);

            expect(defaultPadding).toBe('md');
            expect(screen.getByTestId('card')).toHaveAttribute('data-padding', 'md');
            expect(screen.getByTestId('card')).toHaveClass('[--card-spacing:--spacing(4)]');
        });

        it.each(CARD_PADDINGS)('applies padding "%s"', padding => {
            render(<Card data-testid="card" padding={padding} />);

            const card = screen.getByTestId('card');
            expect(card).toHaveAttribute('data-padding', padding);
            expect(card).toHaveClass(paddingClasses[padding]);
        });

        it.each([
            ['sm', '[--card-spacing:--spacing(3)]'],
            ['md', '[--card-spacing:--spacing(4)]'],
            ['lg', '[--card-spacing:--spacing(6)]'],
            ['xl', '[--card-spacing:--spacing(8)]'],
        ] as const)('maps padding "%s" to %s', (padding, expected) => {
            render(<Card data-testid="card" padding={padding} />);

            expect(screen.getByTestId('card')).toHaveClass(expected);
        });
    });

    describe('radius', () => {
        it('uses the xl radius by default', () => {
            render(<Card data-testid="card" />);

            expect(defaultRadius).toBe('xl');
            expect(screen.getByTestId('card')).toHaveAttribute('data-radius', 'xl');
            expect(screen.getByTestId('card')).toHaveClass('rounded-xl');
        });

        it.each(CARD_RADII)('applies radius "%s"', radius => {
            render(<Card data-testid="card" radius={radius} />);

            const card = screen.getByTestId('card');
            expect(card).toHaveAttribute('data-radius', radius);
            expect(card).toHaveClass(radiusClasses[radius]);
        });

        it.each([
            ['md', 'rounded-md'],
            ['lg', 'rounded-lg'],
            ['xl', 'rounded-xl'],
        ] as const)('maps radius "%s" to %s', (radius, expected) => {
            render(<Card data-testid="card" radius={radius} />);

            expect(screen.getByTestId('card')).toHaveClass(expected);
        });
    });

    describe('customization', () => {
        it('keeps the base classes on the root', () => {
            render(<Card data-testid="card" />);

            expect(screen.getByTestId('card')).toHaveClass(
                'flex',
                'flex-col',
                'border',
                'bg-card',
                'text-card-foreground',
            );
        });

        it('sets no text size and no gap on the card', () => {
            render(<Card data-testid="card" />);

            const card = screen.getByTestId('card');
            expect(card.className).not.toMatch(/(^|\s)text-(xs|sm|base|lg|xl)(\s|$)/);
            expect(card.className).not.toMatch(/(^|\s)gap-/);
        });

        it('sets data-slot on every part', () => {
            render(
                <Card data-testid="card">
                    <CardHeader data-testid="header">
                        <CardTitle data-testid="title">Title</CardTitle>
                        <CardDescription data-testid="description">Description</CardDescription>
                        <CardAction data-testid="action">Action</CardAction>
                    </CardHeader>
                    <CardContent data-testid="content">Content</CardContent>
                    <CardFooter data-testid="footer">Footer</CardFooter>
                </Card>,
            );

            expect(screen.getByTestId('card')).toHaveAttribute('data-slot', 'card');
            expect(screen.getByTestId('header')).toHaveAttribute('data-slot', 'card-header');
            expect(screen.getByTestId('title')).toHaveAttribute('data-slot', 'card-title');
            expect(screen.getByTestId('description')).toHaveAttribute('data-slot', 'card-description');
            expect(screen.getByTestId('action')).toHaveAttribute('data-slot', 'card-action');
            expect(screen.getByTestId('content')).toHaveAttribute('data-slot', 'card-content');
            expect(screen.getByTestId('footer')).toHaveAttribute('data-slot', 'card-footer');
        });

        it('styles the title and the description', () => {
            render(
                <>
                    <CardTitle>Title</CardTitle>
                    <CardDescription>Description</CardDescription>
                </>,
            );

            expect(screen.getByText('Title')).toHaveClass('text-lg', 'leading-snug', 'font-semibold');
            expect(screen.getByText('Description')).toHaveClass('text-sm', 'text-muted-foreground');
        });

        it.each([
            ['Card', Card],
            ['CardHeader', CardHeader],
            ['CardTitle', CardTitle],
            ['CardDescription', CardDescription],
            ['CardAction', CardAction],
            ['CardContent', CardContent],
            ['CardFooter', CardFooter],
        ])('merges a custom className on %s', (_name, Part) => {
            render(<Part data-testid="part" className="custom-class" />);

            expect(screen.getByTestId('part')).toHaveClass('custom-class');
        });

        it('lets a custom className override the radius', () => {
            render(<Card data-testid="card" className="rounded-none" />);

            const card = screen.getByTestId('card');
            expect(card).toHaveClass('rounded-none');
            expect(card).not.toHaveClass('rounded-xl');
        });

        it('lets a custom className override the title size', () => {
            render(<CardTitle className="text-2xl">Title</CardTitle>);

            const title = screen.getByText('Title');
            expect(title).toHaveClass('text-2xl');
            expect(title).not.toHaveClass('text-lg');
        });
    });
});
