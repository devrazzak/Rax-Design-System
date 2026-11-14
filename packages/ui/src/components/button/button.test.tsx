import type { MouseEvent as ReactMouseEvent, SubmitEvent } from 'react';
import { createRef } from 'react';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';

import { Button } from './button';
import { BUTTON_SIZES, BUTTON_VARIANTS } from './button.variants';

/** Form submit handler that prevents jsdom from trying to navigate. */
function createSubmitHandler() {
    return jest.fn((event: SubmitEvent<HTMLFormElement>) => event.preventDefault());
}

describe('Button', () => {
    describe('defaults', () => {
        it('renders a button with an accessible name', () => {
            render(<Button>Save</Button>);

            expect(screen.getByRole('button', { name: 'Save' })).toBeInTheDocument();
        });

        it('uses the primary variant and default size', () => {
            render(<Button>Save</Button>);

            const button = screen.getByRole('button', { name: 'Save' });
            expect(button).toHaveAttribute('data-slot', 'button');
            expect(button).toHaveAttribute('data-variant', 'primary');
            expect(button).toHaveAttribute('data-size', 'default');
        });
    });

    describe('variants and sizes', () => {
        it.each(BUTTON_VARIANTS)('exposes variant "%s" through data-variant', variant => {
            render(<Button variant={variant}>Save</Button>);

            expect(screen.getByRole('button', { name: 'Save' })).toHaveAttribute('data-variant', variant);
        });

        it.each(BUTTON_SIZES)('exposes size "%s" through data-size', size => {
            render(<Button size={size}>Save</Button>);

            expect(screen.getByRole('button', { name: 'Save' })).toHaveAttribute('data-size', size);
        });
    });

    describe('type attribute', () => {
        it('defaults to type="button"', () => {
            render(<Button>Save</Button>);

            expect(screen.getByRole('button', { name: 'Save' })).toHaveAttribute('type', 'button');
        });

        it('does not submit a form unless type="submit" is set', async () => {
            const user = userEvent.setup();
            const onSubmit = createSubmitHandler();
            render(
                <form onSubmit={onSubmit}>
                    <Button>Cancel</Button>
                </form>,
            );

            await user.click(screen.getByRole('button', { name: 'Cancel' }));

            expect(onSubmit).not.toHaveBeenCalled();
        });

        it('submits the form when type="submit" is set', async () => {
            const user = userEvent.setup();
            const onSubmit = createSubmitHandler();
            render(
                <form onSubmit={onSubmit}>
                    <Button type="submit">Save</Button>
                </form>,
            );

            await user.click(screen.getByRole('button', { name: 'Save' }));

            expect(onSubmit).toHaveBeenCalledTimes(1);
        });
    });

    describe('interaction', () => {
        it('calls onClick when clicked', async () => {
            const user = userEvent.setup();
            const onClick = jest.fn();
            render(<Button onClick={onClick}>Save</Button>);

            await user.click(screen.getByRole('button', { name: 'Save' }));

            expect(onClick).toHaveBeenCalledTimes(1);
        });

        it('does not call onClick when disabled', async () => {
            const user = userEvent.setup();
            const onClick = jest.fn();
            render(
                <Button disabled onClick={onClick}>
                    Save
                </Button>,
            );

            await user.click(screen.getByRole('button', { name: 'Save' }));

            expect(onClick).not.toHaveBeenCalled();
        });

        it.each([
            ['Enter', '{Enter}'],
            ['Space', ' '],
        ])('activates with the %s key', async (_name, key) => {
            const user = userEvent.setup();
            const onClick = jest.fn();
            render(<Button onClick={onClick}>Save</Button>);

            await user.tab();
            await user.keyboard(key);

            expect(onClick).toHaveBeenCalledTimes(1);
        });

        it('receives keyboard focus through Tab', async () => {
            const user = userEvent.setup();
            render(<Button>Save</Button>);

            await user.tab();

            expect(screen.getByRole('button', { name: 'Save' })).toHaveFocus();
        });

        it('is skipped by Tab when disabled', async () => {
            const user = userEvent.setup();
            render(<Button disabled>Save</Button>);

            await user.tab();

            expect(screen.getByRole('button', { name: 'Save' })).not.toHaveFocus();
        });
    });

    describe('loading', () => {
        it('keeps the accessible name and announces the busy state', () => {
            render(<Button loading>Save</Button>);

            const button = screen.getByRole('button', { name: 'Save' });
            expect(button).toHaveAttribute('aria-busy', 'true');
            expect(button).toHaveAttribute('aria-disabled', 'true');
            expect(button).toHaveAttribute('data-loading', 'true');
        });

        it('does not set the native disabled attribute, so keyboard focus is kept', () => {
            render(<Button loading>Save</Button>);

            expect(screen.getByRole('button', { name: 'Save' })).not.toBeDisabled();
        });

        it('keeps keyboard focus when loading starts', () => {
            const { rerender } = render(<Button>Save</Button>);
            const button = screen.getByRole('button', { name: 'Save' });
            button.focus();

            rerender(<Button loading>Save</Button>);

            expect(button).toHaveFocus();
        });

        it('calls onClick when not loading (control case)', async () => {
            const user = userEvent.setup();
            const onClick = jest.fn();
            render(<Button onClick={onClick}>Save</Button>);

            await user.click(screen.getByRole('button', { name: 'Save' }));

            expect(onClick).toHaveBeenCalledTimes(1);
        });

        it('does not call onClick while loading', async () => {
            const user = userEvent.setup();
            const onClick = jest.fn();
            render(
                <Button loading onClick={onClick}>
                    Save
                </Button>,
            );

            await user.click(screen.getByRole('button', { name: 'Save' }));

            expect(onClick).not.toHaveBeenCalled();
        });

        it('submits the form when not loading (control case)', async () => {
            const user = userEvent.setup();
            const onSubmit = createSubmitHandler();
            render(
                <form onSubmit={onSubmit}>
                    <Button type="submit">Save</Button>
                </form>,
            );

            await user.click(screen.getByRole('button', { name: 'Save' }));

            expect(onSubmit).toHaveBeenCalledTimes(1);
        });

        it('does not submit the form while loading', async () => {
            const user = userEvent.setup();
            const onSubmit = createSubmitHandler();
            render(
                <form onSubmit={onSubmit}>
                    <Button type="submit" loading>
                        Save
                    </Button>
                </form>,
            );

            await user.click(screen.getByRole('button', { name: 'Save' }));

            expect(onSubmit).not.toHaveBeenCalled();
        });

        it('shows no spinner when not loading', () => {
            render(<Button>Save</Button>);

            const button = screen.getByRole('button', { name: 'Save' });
            expect(button.querySelector('[data-slot="spinner"]')).not.toBeInTheDocument();
            expect(button).not.toHaveAttribute('aria-busy');
        });

        it('shows the spinner after the label by default', () => {
            render(<Button loading>Save</Button>);

            const button = screen.getByRole('button', { name: 'Save' });
            const spinner = button.querySelector('[data-slot="spinner"]');
            expect(spinner).toBeInTheDocument();
            expect(button.lastChild).toBe(spinner);
        });

        it('shows the spinner before the label with loadingPosition="start"', () => {
            render(
                <Button loading loadingPosition="start">
                    Save
                </Button>,
            );

            const button = screen.getByRole('button', { name: 'Save' });
            const spinner = button.querySelector('[data-slot="spinner"]');
            expect(spinner).toBeInTheDocument();
            expect(button.firstChild).toBe(spinner);
        });

        it('keeps the spinner out of the accessible name', () => {
            render(<Button loading>Save</Button>);

            expect(screen.getByRole('button')).toHaveAccessibleName('Save');
        });

        it.each([
            ['Enter', '{Enter}'],
            ['Space', ' '],
        ])('does not call onClick when activated with the %s key while loading', async (_name, key) => {
            const user = userEvent.setup();
            const onClick = jest.fn();
            render(
                <Button loading onClick={onClick}>
                    Save
                </Button>,
            );

            await user.tab();
            // Control: the button is reachable by keyboard, so the key press below really targets it
            expect(screen.getByRole('button', { name: 'Save' })).toHaveFocus();
            await user.keyboard(key);

            expect(onClick).not.toHaveBeenCalled();
        });

        it('removes the busy state and the spinner when loading ends', () => {
            const { rerender } = render(<Button loading>Save</Button>);
            const button = screen.getByRole('button', { name: 'Save' });
            expect(button).toHaveAttribute('aria-busy', 'true');

            rerender(<Button>Save</Button>);

            expect(button).not.toHaveAttribute('aria-busy');
            expect(button).not.toHaveAttribute('aria-disabled');
            expect(button.querySelector('[data-slot="spinner"]')).not.toBeInTheDocument();
        });

        it.each([
            ['xs', 'size-3'],
            ['sm', 'size-3'],
            ['default', 'size-4'],
            ['lg', 'size-4'],
        ] as const)('uses a spinner that fits the "%s" button size', (size, spinnerClass) => {
            render(
                <Button loading size={size}>
                    Save
                </Button>,
            );

            const spinner = screen.getByRole('button', { name: 'Save' }).querySelector('[data-slot="spinner"]');
            expect(spinner).toHaveClass(spinnerClass);
        });

        describe('with asChild', () => {
            it('puts the spinner after the link text by default', () => {
                render(
                    <Button asChild loading>
                        <a href="/continue">Continue</a>
                    </Button>,
                );

                const link = screen.getByRole('link', { name: 'Continue' });
                expect(link.lastChild).toBe(link.querySelector('[data-slot="spinner"]'));
            });

            it('puts the spinner before the link text with loadingPosition="start"', () => {
                render(
                    <Button asChild loading loadingPosition="start">
                        <a href="/continue">Continue</a>
                    </Button>,
                );

                const link = screen.getByRole('link', { name: 'Continue' });
                expect(link.firstChild).toBe(link.querySelector('[data-slot="spinner"]'));
            });

            it('puts the busy state and the spinner on the child element', () => {
                render(
                    <Button asChild loading>
                        <a href="/continue">Continue</a>
                    </Button>,
                );

                const link = screen.getByRole('link', { name: 'Continue' });
                expect(link).toHaveAttribute('aria-busy', 'true');
                expect(link.querySelector('[data-slot="spinner"]')).toBeInTheDocument();
            });

            it('prevents the default action of the link click while loading', async () => {
                const user = userEvent.setup();
                const readDefaultPrevented = jest.fn((event: ReactMouseEvent) => event.isDefaultPrevented());
                render(
                    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
                    <div onClick={readDefaultPrevented}>
                        <Button asChild loading>
                            <a href="/continue">Continue</a>
                        </Button>
                    </div>,
                );

                await user.click(screen.getByRole('link', { name: 'Continue' }));

                expect(readDefaultPrevented).toHaveReturnedWith(true);
            });
        });
    });

    describe('prop forwarding', () => {
        it('forwards native attributes to the button element', () => {
            render(
                <Button id="save" data-testid="cta" aria-expanded="true" aria-haspopup="menu">
                    Save
                </Button>,
            );

            const button = screen.getByTestId('cta');
            expect(button).toHaveAttribute('id', 'save');
            expect(button).toHaveAttribute('aria-expanded', 'true');
            expect(button).toHaveAttribute('aria-haspopup', 'menu');
        });

        // Fails on React 18, where a ref prop is not forwarded without forwardRef.
        it('forwards the ref to the button element', () => {
            const ref = createRef<HTMLButtonElement>();
            render(<Button ref={ref}>Save</Button>);

            expect(ref.current).toBe(screen.getByRole('button', { name: 'Save' }));
        });
    });

    describe('asChild', () => {
        it('renders the child element instead of a button', () => {
            render(
                <Button asChild>
                    <a href="/continue">Continue</a>
                </Button>,
            );

            const link = screen.getByRole('link', { name: 'Continue' });
            expect(link).toHaveAttribute('href', '/continue');
            expect(link).toHaveAttribute('data-slot', 'button');
            expect(link).not.toHaveAttribute('type');
            expect(screen.queryByRole('button')).not.toBeInTheDocument();
        });

        it('does not put a type attribute on the child, even when one is passed', () => {
            render(
                <Button asChild type="submit">
                    <a href="/continue">Continue</a>
                </Button>,
            );

            expect(screen.getByRole('link', { name: 'Continue' })).not.toHaveAttribute('type');
        });

        it('keeps the data-variant and data-size attributes on the child', () => {
            render(
                <Button asChild variant="link" size="lg">
                    <a href="/continue">Continue</a>
                </Button>,
            );

            const link = screen.getByRole('link', { name: 'Continue' });
            expect(link).toHaveAttribute('data-variant', 'link');
            expect(link).toHaveAttribute('data-size', 'lg');
        });

        it('calls both the Button onClick and the child onClick', async () => {
            const user = userEvent.setup();
            const onButtonClick = jest.fn();
            const onChildClick = jest.fn((event: ReactMouseEvent) => event.preventDefault());
            render(
                <Button asChild onClick={onButtonClick}>
                    <a href="/continue" onClick={onChildClick}>
                        Continue
                    </a>
                </Button>,
            );

            await user.click(screen.getByRole('link', { name: 'Continue' }));

            expect(onButtonClick).toHaveBeenCalledTimes(1);
            expect(onChildClick).toHaveBeenCalledTimes(1);
        });
    });

    describe('styling', () => {
        // Relies on `px-4` being part of the default size. Update it if the default padding changes.
        it('lets consumer className override conflicting variant classes', () => {
            render(<Button className="px-10">Save</Button>);

            const button = screen.getByRole('button', { name: 'Save' });
            expect(button).toHaveClass('px-10');
            expect(button).not.toHaveClass('px-4');
        });

        it('keeps non-conflicting consumer classes', () => {
            render(<Button className="custom-class">Save</Button>);

            expect(screen.getByRole('button', { name: 'Save' })).toHaveClass('custom-class');
        });
    });

    describe('accessibility', () => {
        it('has no violations in the default state', async () => {
            const { container } = render(<Button>Save</Button>);

            expect(await axe(container)).toHaveNoViolations();
        });

        it.each(BUTTON_VARIANTS)('has no violations for variant "%s"', async variant => {
            const { container } = render(<Button variant={variant}>Save</Button>);

            expect(await axe(container)).toHaveNoViolations();
        });

        it('has no violations when disabled', async () => {
            const { container } = render(<Button disabled>Save</Button>);

            expect(await axe(container)).toHaveNoViolations();
        });

        it('has no violations as a link rendered with asChild', async () => {
            const { container } = render(
                <Button asChild>
                    <a href="/continue">Continue</a>
                </Button>,
            );

            expect(await axe(container)).toHaveNoViolations();
        });

        it('has no violations while loading', async () => {
            const { container } = render(<Button loading>Save</Button>);

            expect(await axe(container)).toHaveNoViolations();
        });

        it('has no violations as an icon-only button with aria-label', async () => {
            const { container } = render(
                <Button aria-label="Send email" className="w-10 px-0">
                    <svg aria-hidden="true" />
                </Button>,
            );

            expect(await axe(container)).toHaveNoViolations();
        });

        it('reports a violation for an icon-only button without an accessible name', async () => {
            const { container } = render(
                <Button>
                    <svg aria-hidden="true" />
                </Button>,
            );

            expect(await axe(container)).not.toHaveNoViolations();
        });
    });
});
