import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';

import { Section } from './section';
import {
    defaultSpacing,
    defaultTag,
    defaultTone,
    SECTION_SPACINGS,
    SECTION_TAGS,
    SECTION_TONES,
    spacingClasses,
    toneClasses,
} from './section.variants';

describe('Section', () => {
    describe('behavior', () => {
        it('renders its children', () => {
            render(<Section data-testid="section">Content</Section>);

            expect(screen.getByTestId('section')).toHaveTextContent('Content');
        });

        it('has the section slot', () => {
            render(<Section data-testid="section" />);

            expect(screen.getByTestId('section')).toHaveAttribute('data-slot', 'section');
        });
    });

    describe('tag', () => {
        it('renders a section element by default', () => {
            render(<Section data-testid="section" />);

            expect(defaultTag).toBe('section');
            expect(screen.getByTestId('section').tagName).toBe('SECTION');
        });

        it.each(SECTION_TAGS)('renders a "%s" element', tag => {
            render(<Section data-testid="section" as={tag} />);

            expect(screen.getByTestId('section').tagName).toBe(tag.toUpperCase());
        });
    });

    describe('spacing', () => {
        it('uses the md spacing by default', () => {
            render(<Section data-testid="section" />);

            expect(defaultSpacing).toBe('md');
            expect(screen.getByTestId('section')).toHaveClass('py-[clamp(2rem,6vw,4rem)]');
        });

        it.each(SECTION_SPACINGS)('applies spacing "%s"', spacing => {
            render(<Section data-testid="section" spacing={spacing} />);

            expect(screen.getByTestId('section')).toHaveClass(spacingClasses[spacing]);
        });
    });

    describe('tone', () => {
        it('uses the default tone by default', () => {
            render(<Section data-testid="section" />);

            expect(defaultTone).toBe('default');
            expect(screen.getByTestId('section')).toHaveClass('bg-background');
        });

        it.each(SECTION_TONES)('applies tone "%s"', tone => {
            render(<Section data-testid="section" tone={tone} />);

            expect(screen.getByTestId('section')).toHaveClass(toneClasses[tone]);
        });

        it('does not change the text color', () => {
            render(<Section data-testid="section" tone="primary" />);

            expect(screen.getByTestId('section').className).not.toMatch(/(^|\s)text-/);
        });
    });

    describe('customization', () => {
        it('lets className override the spacing', () => {
            render(<Section data-testid="section" spacing="xl" className="py-0" />);

            const section = screen.getByTestId('section');
            expect(section).toHaveClass('py-0');
            expect(section).not.toHaveClass(spacingClasses.xl);
        });

        it('lets className override the tone', () => {
            render(<Section data-testid="section" tone="primary" className="bg-transparent" />);

            const section = screen.getByTestId('section');
            expect(section).toHaveClass('bg-transparent');
            expect(section).not.toHaveClass('bg-primary');
        });

        it('forwards native attributes to the root element', () => {
            render(<Section data-testid="section" id="features" />);

            expect(screen.getByTestId('section')).toHaveAttribute('id', 'features');
        });
    });

    describe('accessibility', () => {
        it('has no axe violations', async () => {
            const { container } = render(
                <Section aria-label="Features">
                    <p>Content</p>
                </Section>,
            );

            expect(await axe(container)).toHaveNoViolations();
        });
    });
});
