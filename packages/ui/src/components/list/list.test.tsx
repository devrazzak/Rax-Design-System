import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';

import { List, ListItem } from './list';
import {
    colorClasses,
    defaultGap,
    defaultMarkerByTag,
    defaultTag,
    gapClasses,
    LIST_COLORS,
    LIST_GAPS,
    LIST_MARKERS,
    LIST_SIZES,
    LIST_TAGS,
    markerClasses,
    sizeClasses,
} from './list.variants';

describe('List', () => {
    describe('tag', () => {
        it('renders the default tag when `as` is not given', () => {
            render(<List data-testid="list" />);

            expect(screen.getByTestId('list').tagName).toBe(defaultTag.toUpperCase());
        });

        it.each(LIST_TAGS)('renders a "%s" element', tag => {
            render(<List data-testid="list" as={tag} />);

            expect(screen.getByTestId('list').tagName).toBe(tag.toUpperCase());
        });

        it('has the list slot', () => {
            render(<List data-testid="list" />);

            expect(screen.getByTestId('list')).toHaveAttribute('data-slot', 'list');
        });
    });

    describe('marker', () => {
        it.each(LIST_TAGS)('uses the default marker for "%s"', tag => {
            render(<List data-testid="list" as={tag} />);

            expect(screen.getByTestId('list')).toHaveClass(...markerClasses[defaultMarkerByTag[tag]].split(' '));
        });

        it('writes the defaults as literals', () => {
            render(
                <>
                    <List data-testid="ul" />
                    <List data-testid="ol" as="ol" />
                </>,
            );

            expect(screen.getByTestId('ul')).toHaveClass('list-disc', 'pl-6');
            expect(screen.getByTestId('ol')).toHaveClass('list-decimal', 'pl-6');
        });

        it.each(LIST_MARKERS)('applies marker "%s"', marker => {
            render(<List data-testid="list" marker={marker} />);

            expect(screen.getByTestId('list')).toHaveClass(...markerClasses[marker].split(' '));
        });

        it('sets role="list" when the marker is none, so the list stays a list for screen readers', () => {
            render(<List marker="none" />);

            expect(screen.getByRole('list')).toBeInTheDocument();
        });

        it('sets no role when there is a marker', () => {
            render(<List data-testid="list" />);

            expect(screen.getByTestId('list')).not.toHaveAttribute('role');
        });
    });

    describe('gap, size and color', () => {
        it('uses the default gap', () => {
            render(<List data-testid="list" />);

            expect(defaultGap).toBe('sm');
            expect(screen.getByTestId('list')).toHaveClass('space-y-2');
        });

        it.each(LIST_GAPS)('applies gap "%s"', gap => {
            render(<List data-testid="list" gap={gap} />);

            expect(screen.getByTestId('list')).toHaveClass(gapClasses[gap]);
        });

        it('sets no size or color by default, so the list inherits them', () => {
            render(<List data-testid="list" />);

            expect(screen.getByTestId('list').className).not.toMatch(/text-/);
        });

        it.each(LIST_SIZES)('applies size "%s"', size => {
            render(<List data-testid="list" size={size} />);

            expect(screen.getByTestId('list')).toHaveClass(sizeClasses[size]);
        });

        it.each(LIST_COLORS)('applies color "%s"', color => {
            render(<List data-testid="list" color={color} />);

            expect(screen.getByTestId('list')).toHaveClass(colorClasses[color]);
        });
    });

    describe('customization', () => {
        it('lets className override the gap', () => {
            render(<List data-testid="list" gap="xl" className="space-y-1" />);

            const list = screen.getByTestId('list');
            expect(list).toHaveClass('space-y-1');
            expect(list).not.toHaveClass(gapClasses.xl);
        });

        it('forwards native attributes to the root element', () => {
            render(<List data-testid="list" id="features" />);

            expect(screen.getByTestId('list')).toHaveAttribute('id', 'features');
        });
    });

    describe('accessibility', () => {
        it('has no axe violations', async () => {
            const { container } = render(
                <List>
                    <ListItem>One</ListItem>
                    <ListItem>Two</ListItem>
                </List>,
            );

            expect(await axe(container)).toHaveNoViolations();
        });

        it('has no axe violations with icons', async () => {
            const { container } = render(
                <List marker="none">
                    <ListItem icon={<svg />}>One</ListItem>
                    <ListItem icon={<svg />}>Two</ListItem>
                </List>,
            );

            expect(await axe(container)).toHaveNoViolations();
        });
    });
});

describe('ListItem', () => {
    describe('behavior', () => {
        it('renders its children inside an li', () => {
            render(
                <List>
                    <ListItem data-testid="item">Content</ListItem>
                </List>,
            );

            const item = screen.getByTestId('item');
            expect(item.tagName).toBe('LI');
            expect(item).toHaveTextContent('Content');
            expect(item).toHaveAttribute('data-slot', 'list-item');
        });

        it('is not a flex container without an icon', () => {
            render(
                <List>
                    <ListItem data-testid="item">Content</ListItem>
                </List>,
            );

            expect(screen.getByTestId('item')).not.toHaveClass('flex');
        });
    });

    describe('icon', () => {
        it('shows the icon before the text and hides it from screen readers', () => {
            render(
                <List marker="none">
                    <ListItem data-testid="item" icon={<svg data-testid="icon" />}>
                        Content
                    </ListItem>
                </List>,
            );

            const item = screen.getByTestId('item');
            expect(item).toHaveClass('flex', 'gap-2');
            expect(item.firstElementChild).toHaveAttribute('aria-hidden', 'true');
            expect(item.firstElementChild).toContainElement(screen.getByTestId('icon'));
            expect(item.lastElementChild).toHaveTextContent('Content');
        });
    });

    describe('customization', () => {
        it('forwards native attributes and className to the li', () => {
            render(
                <List>
                    <ListItem data-testid="item" id="first" className="custom-class">
                        Content
                    </ListItem>
                </List>,
            );

            const item = screen.getByTestId('item');
            expect(item).toHaveAttribute('id', 'first');
            expect(item).toHaveClass('custom-class');
        });
    });
});
