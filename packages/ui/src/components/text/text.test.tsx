import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';

import { Text } from './text';
import {
    colorClasses,
    defaultColor,
    defaultSize,
    defaultTag,
    defaultWeight,
    sizeClasses,
    TEXT_COLORS,
    TEXT_SIZES,
    TEXT_TAGS,
    TEXT_TEXT_ALIGNS,
    TEXT_TRACKINGS,
    TEXT_TRANSFORMS,
    TEXT_WEIGHTS,
    textAlignClasses,
    textTransformClasses,
    trackingClasses,
    weightClasses,
} from './text.variants';

describe('Text', () => {
    describe('tag', () => {
        it('renders the default tag when `as` is not given', () => {
            render(<Text data-testid="text">Hello</Text>);

            expect(screen.getByTestId('text').tagName).toBe(defaultTag.toUpperCase());
        });

        it.each(TEXT_TAGS)('renders a "%s" element', tag => {
            render(
                <Text data-testid="text" as={tag}>
                    Hello
                </Text>,
            );

            expect(screen.getByTestId('text').tagName).toBe(tag.toUpperCase());
        });
    });

    describe('size, weight and color', () => {
        it('uses the default size, weight and color', () => {
            render(<Text data-testid="text">Hello</Text>);

            expect(screen.getByTestId('text')).toHaveClass(
                sizeClasses[defaultSize],
                weightClasses[defaultWeight],
                colorClasses[defaultColor],
            );
        });

        it.each(TEXT_SIZES)('applies size "%s"', size => {
            render(
                <Text data-testid="text" size={size}>
                    Hello
                </Text>,
            );

            expect(screen.getByTestId('text')).toHaveClass(sizeClasses[size]);
        });

        it.each(TEXT_WEIGHTS)('applies weight "%s"', weight => {
            render(
                <Text data-testid="text" weight={weight}>
                    Hello
                </Text>,
            );

            expect(screen.getByTestId('text')).toHaveClass(weightClasses[weight]);
        });

        it.each(TEXT_COLORS)('applies color "%s"', color => {
            render(
                <Text data-testid="text" color={color}>
                    Hello
                </Text>,
            );

            expect(screen.getByTestId('text')).toHaveClass(colorClasses[color]);
        });
    });

    describe('layout and typography', () => {
        it('sets no text align, transform or tracking by default', () => {
            render(<Text data-testid="text">Hello</Text>);

            const text = screen.getByTestId('text');
            expect(text.className).toBe('text-base font-normal text-foreground');
        });

        it.each(TEXT_TEXT_ALIGNS)('applies textAlign "%s"', textAlign => {
            render(
                <Text data-testid="text" textAlign={textAlign}>
                    Hello
                </Text>,
            );

            expect(screen.getByTestId('text')).toHaveClass(textAlignClasses[textAlign]);
        });

        it.each(TEXT_TRANSFORMS)('applies textTransform "%s"', textTransform => {
            render(
                <Text data-testid="text" textTransform={textTransform}>
                    Hello
                </Text>,
            );

            expect(screen.getByTestId('text')).toHaveClass(textTransformClasses[textTransform]);
        });

        it.each(TEXT_TRACKINGS)('applies tracking "%s"', tracking => {
            render(
                <Text data-testid="text" tracking={tracking}>
                    Hello
                </Text>,
            );

            expect(screen.getByTestId('text')).toHaveClass(trackingClasses[tracking]);
        });

        it('writes the key classes as literals', () => {
            render(
                <Text data-testid="text" textAlign="center" textTransform="uppercase" tracking="wide">
                    Hello
                </Text>,
            );

            expect(screen.getByTestId('text')).toHaveClass('text-center', 'uppercase', 'tracking-wide');
        });
    });

    describe('customization', () => {
        it('lets className override the size', () => {
            render(
                <Text data-testid="text" className="text-2xl">
                    Hello
                </Text>,
            );

            const text = screen.getByTestId('text');
            expect(text).toHaveClass('text-2xl');
            expect(text).not.toHaveClass('text-base');
        });

        it('forwards native attributes to the root element', () => {
            render(
                <Text data-testid="text" id="intro">
                    Hello
                </Text>,
            );

            expect(screen.getByTestId('text')).toHaveAttribute('id', 'intro');
        });
    });

    describe('accessibility', () => {
        it('has no axe violations', async () => {
            const { container } = render(<Text>Hello</Text>);

            expect(await axe(container)).toHaveNoViolations();
        });
    });
});
