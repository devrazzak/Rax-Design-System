import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';

import { Heading } from './heading';
import {
    colorClasses,
    defaultColor,
    defaultSizeByTag,
    defaultTag,
    defaultWeight,
    HEADING_COLORS,
    HEADING_SIZES,
    HEADING_TAGS,
    HEADING_TEXT_TRANSFORMS,
    HEADING_WEIGHTS,
    sizeClasses,
    textTransformClasses,
    weightClasses,
} from './heading.variants';

describe('Heading', () => {
    describe('tag', () => {
        it('renders the default tag when `as` is not given', () => {
            render(<Heading>Title</Heading>);

            expect(screen.getByRole('heading').tagName).toBe(defaultTag.toUpperCase());
        });

        it.each(HEADING_TAGS)('renders a "%s" element', tag => {
            render(<Heading as={tag}>Title</Heading>);

            expect(screen.getByRole('heading').tagName).toBe(tag.toUpperCase());
        });

        it('does not change the tag when a size is given', () => {
            render(
                <Heading as="h3" size="5xl">
                    Title
                </Heading>,
            );

            expect(screen.getByRole('heading', { level: 3 })).toBeInTheDocument();
        });
    });

    describe('size, weight and color', () => {
        it.each(HEADING_TAGS)('uses the default size for "%s"', tag => {
            render(<Heading as={tag}>Title</Heading>);

            expect(screen.getByRole('heading')).toHaveClass(sizeClasses[defaultSizeByTag[tag]]);
        });

        it('uses the default weight', () => {
            render(<Heading>Title</Heading>);

            expect(screen.getByRole('heading')).toHaveClass(weightClasses[defaultWeight]);
        });

        it.each(HEADING_SIZES)('applies size "%s"', size => {
            render(<Heading size={size}>Title</Heading>);

            expect(screen.getByRole('heading')).toHaveClass(sizeClasses[size]);
        });

        it.each(HEADING_WEIGHTS)('applies weight "%s"', weight => {
            render(<Heading weight={weight}>Title</Heading>);

            expect(screen.getByRole('heading')).toHaveClass(weightClasses[weight]);
        });

        it('uses the default color', () => {
            render(<Heading>Title</Heading>);

            expect(screen.getByRole('heading')).toHaveClass(colorClasses[defaultColor]);
        });

        it('maps size "md" to text-base, the same as Text', () => {
            render(<Heading size="md">Title</Heading>);

            expect(screen.getByRole('heading')).toHaveClass('text-base');
        });

        it.each(HEADING_COLORS)('applies color "%s"', color => {
            render(<Heading color={color}>Title</Heading>);

            expect(screen.getByRole('heading')).toHaveClass(colorClasses[color]);
        });
    });

    describe('textTransform', () => {
        it('adds no transform class by default', () => {
            render(<Heading>Title</Heading>);

            expect(screen.getByRole('heading').className).not.toMatch(/uppercase|lowercase|capitalize/);
        });

        it.each(HEADING_TEXT_TRANSFORMS)('applies textTransform "%s"', textTransform => {
            render(<Heading textTransform={textTransform}>Title</Heading>);

            expect(screen.getByRole('heading')).toHaveClass(textTransformClasses[textTransform]);
        });

        it('writes the key classes as literals', () => {
            render(<Heading textTransform="uppercase">Title</Heading>);

            expect(screen.getByRole('heading')).toHaveClass('uppercase');
        });
    });

    describe('customization', () => {
        it('lets className override the base size', () => {
            render(
                <Heading as="h2" className="text-sm">
                    Title
                </Heading>,
            );

            const heading = screen.getByRole('heading');
            expect(heading).toHaveClass('text-sm');
            expect(heading).not.toHaveClass('text-3xl');
        });

        it('forwards native attributes to the root element', () => {
            render(<Heading id="page-title">Title</Heading>);

            expect(screen.getByRole('heading')).toHaveAttribute('id', 'page-title');
        });
    });

    describe('accessibility', () => {
        it('has no axe violations', async () => {
            const { container } = render(<Heading as="h1">Title</Heading>);

            expect(await axe(container)).toHaveNoViolations();
        });
    });
});
