import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';

import {
    Breadcrumb,
    BreadcrumbEllipsis,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from './breadcrumb';
import { BREADCRUMB_SIZES, sizeClasses } from './breadcrumb.variants';

function TestBreadcrumb(props: Partial<React.ComponentProps<typeof Breadcrumb>>) {
    return (
        <Breadcrumb {...props}>
            <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbLink href="/">Home</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                    <BreadcrumbEllipsis />
                </BreadcrumbItem>
                <BreadcrumbSeparator>/</BreadcrumbSeparator>
                <BreadcrumbItem>
                    <BreadcrumbPage>Current</BreadcrumbPage>
                </BreadcrumbItem>
            </BreadcrumbList>
        </Breadcrumb>
    );
}

describe('Breadcrumb', () => {
    describe('behavior', () => {
        it('renders the trail as a navigation with an ordered list', () => {
            render(<TestBreadcrumb />);

            const nav = screen.getByRole('navigation', { name: 'breadcrumb' });
            expect(nav.querySelector('ol')).toBeInTheDocument();
            expect(nav.querySelectorAll('li')).toHaveLength(5);
        });

        it('renders a link that points to its page', () => {
            render(<TestBreadcrumb />);

            expect(screen.getByRole('link', { name: 'Home' })).toHaveAttribute('href', '/');
        });

        it('renders the child element instead of an <a> with asChild', () => {
            render(
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink asChild>
                                <button type="button">Home</button>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>,
            );

            const button = screen.getByRole('button', { name: 'Home' });
            expect(button).toHaveAttribute('data-slot', 'breadcrumb-link');
        });

        it('renders a custom separator instead of the chevron', () => {
            render(<TestBreadcrumb />);

            const separators = document.querySelectorAll('[data-slot=breadcrumb-separator]');
            expect(separators.item(0).querySelector('svg')).toBeInTheDocument();
            expect(separators.item(1)).toHaveTextContent('/');
            expect(separators.item(1).querySelector('svg')).not.toBeInTheDocument();
        });
    });

    describe('accessibility', () => {
        it('marks the current page', () => {
            render(<TestBreadcrumb />);

            const page = screen.getByText('Current');
            expect(page).toHaveAttribute('aria-current', 'page');
            expect(page).toHaveAttribute('aria-disabled', 'true');
        });

        it('hides separators and the ellipsis from screen readers', () => {
            render(<TestBreadcrumb />);

            document
                .querySelectorAll('[data-slot=breadcrumb-separator], [data-slot=breadcrumb-ellipsis]')
                .forEach(element => expect(element).toHaveAttribute('aria-hidden', 'true'));
        });

        it('has no axe violations', async () => {
            const { container } = render(<TestBreadcrumb />);

            expect(await axe(container)).toHaveNoViolations();
        });
    });

    describe('size', () => {
        it('uses the md size by default', () => {
            render(<TestBreadcrumb />);

            const nav = screen.getByRole('navigation');
            expect(nav).toHaveAttribute('data-size', 'md');
            expect(nav).toHaveClass('text-base');
        });

        it.each(BREADCRUMB_SIZES)('applies size "%s"', size => {
            render(<TestBreadcrumb size={size} />);

            const nav = screen.getByRole('navigation');
            expect(nav).toHaveAttribute('data-size', size);
            expect(nav).toHaveClass(sizeClasses[size]);
        });
    });

    describe('customization', () => {
        it('sets a data-slot on every part', () => {
            render(<TestBreadcrumb />);

            expect(screen.getByRole('navigation')).toHaveAttribute('data-slot', 'breadcrumb');
            expect(screen.getByRole('list')).toHaveAttribute('data-slot', 'breadcrumb-list');
            expect(screen.getByRole('link', { name: 'Home' }).closest('li')).toHaveAttribute(
                'data-slot',
                'breadcrumb-item',
            );
            expect(screen.getByRole('link', { name: 'Home' })).toHaveAttribute('data-slot', 'breadcrumb-link');
            expect(screen.getByText('Current')).toHaveAttribute('data-slot', 'breadcrumb-page');
            expect(document.querySelector('[data-slot=breadcrumb-separator]')).toBeInTheDocument();
            expect(document.querySelector('[data-slot=breadcrumb-ellipsis]')).toBeInTheDocument();
        });

        it('merges a custom className on every part', () => {
            render(
                <Breadcrumb className="nav-custom">
                    <BreadcrumbList className="list-custom">
                        <BreadcrumbItem className="item-custom">
                            <BreadcrumbLink href="/" className="link-custom">
                                Home
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator className="separator-custom" />
                        <BreadcrumbItem>
                            <BreadcrumbEllipsis className="ellipsis-custom" />
                        </BreadcrumbItem>
                        <BreadcrumbItem>
                            <BreadcrumbPage className="page-custom">Current</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>,
            );

            expect(screen.getByRole('navigation')).toHaveClass('nav-custom');
            expect(screen.getByRole('list')).toHaveClass('list-custom');
            expect(screen.getByRole('link', { name: 'Home' }).closest('li')).toHaveClass('item-custom');
            expect(screen.getByRole('link', { name: 'Home' })).toHaveClass('link-custom');
            expect(document.querySelector('[data-slot=breadcrumb-separator]')).toHaveClass('separator-custom');
            expect(document.querySelector('[data-slot=breadcrumb-ellipsis]')).toHaveClass('ellipsis-custom');
            expect(screen.getByText('Current')).toHaveClass('page-custom');
        });

        it('lets a custom className override the text size', () => {
            render(<TestBreadcrumb className="text-xs" />);

            const nav = screen.getByRole('navigation');
            expect(nav).toHaveClass('text-xs');
            expect(nav).not.toHaveClass('text-base');
        });
    });
});
