import type { MouseEvent as ReactMouseEvent, SubmitEvent } from 'react';
import { createRef } from 'react';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';

import { Button } from './button';

const VARIANTS = ['primary', 'secondary', 'outline', 'ghost', 'destructive', 'link', 'linkInverse'] as const;
const SIZES = ['xs', 'sm', 'default', 'lg'] as const;

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
        it.each(VARIANTS)('exposes variant "%s" through data-variant', variant => {
            render(<Button variant={variant}>Save</Button>);

            expect(screen.getByRole('button', { name: 'Save' })).toHaveAttribute('data-variant', variant);
        });

        it.each(SIZES)('exposes size "%s" through data-size', size => {
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
                    <Button type="submit">Donate</Button>
                </form>,
            );

            await user.click(screen.getByRole('button', { name: 'Donate' }));

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

    // Deferred until the `loading` prop returns (tracked in DECISIONS.md).
    // describe('loading', () => {
    //     it('keeps the accessible name and announces the busy state', () => {
    //         render(<Button loading>Donate</Button>);

    //         const button = screen.getByRole('button', { name: 'Donate' });
    //         expect(button).toHaveAttribute('aria-busy', 'true');
    //         expect(button).toHaveAttribute('aria-disabled', 'true');
    //     });

    //     it('does not call onClick while loading', async () => {
    //         const user = userEvent.setup();
    //         const onClick = jest.fn();
    //         render(
    //             <Button loading onClick={onClick}>
    //                 Donate
    //             </Button>,
    //         );

    //         await user.click(screen.getByRole('button', { name: 'Donate' }));

    //         expect(onClick).not.toHaveBeenCalled();
    //     });

    //     it('submits the form when not loading (control case)', async () => {
    //         const user = userEvent.setup();
    //         const onSubmit = createSubmitHandler();
    //         render(
    //             <form onSubmit={onSubmit}>
    //                 <Button type="submit">Donate</Button>
    //             </form>,
    //         );

    //         await user.click(screen.getByRole('button', { name: 'Donate' }));

    //         expect(onSubmit).toHaveBeenCalledTimes(1);
    //     });

    //     it('does not submit the form while loading', async () => {
    //         const user = userEvent.setup();
    //         const onSubmit = createSubmitHandler();
    //         render(
    //             <form onSubmit={onSubmit}>
    //                 <Button type="submit" loading>
    //                     Donate
    //                 </Button>
    //             </form>,
    //         );

    //         await user.click(screen.getByRole('button', { name: 'Donate' }));

    //         expect(onSubmit).not.toHaveBeenCalled();
    //     });

    //     it('keeps keyboard focus when loading starts', () => {
    //         const { rerender } = render(<Button>Donate</Button>);
    //         const button = screen.getByRole('button', { name: 'Donate' });
    //         button.focus();

    //         rerender(<Button loading>Donate</Button>);

    //         expect(button).toHaveFocus();
    //     });
    // });

    describe('prop forwarding', () => {
        it('forwards native attributes to the button element', () => {
            render(
                <Button id="donate" data-testid="cta" aria-expanded="true" aria-haspopup="menu">
                    Donate
                </Button>,
            );

            const button = screen.getByTestId('cta');
            expect(button).toHaveAttribute('id', 'donate');
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
                    <a href="/donate">Donate</a>
                </Button>,
            );

            const link = screen.getByRole('link', { name: 'Donate' });
            expect(link).toHaveAttribute('href', '/donate');
            expect(link).toHaveAttribute('data-slot', 'button');
            expect(link).not.toHaveAttribute('type');
            expect(screen.queryByRole('button')).not.toBeInTheDocument();
        });

        it('does not put a type attribute on the child, even when one is passed', () => {
            render(
                <Button asChild type="submit">
                    <a href="/donate">Donate</a>
                </Button>,
            );

            expect(screen.getByRole('link', { name: 'Donate' })).not.toHaveAttribute('type');
        });

        it('keeps the data-variant and data-size attributes on the child', () => {
            render(
                <Button asChild variant="link" size="lg">
                    <a href="/donate">Donate</a>
                </Button>,
            );

            const link = screen.getByRole('link', { name: 'Donate' });
            expect(link).toHaveAttribute('data-variant', 'link');
            expect(link).toHaveAttribute('data-size', 'lg');
        });

        it('calls both the Button onClick and the child onClick', async () => {
            const user = userEvent.setup();
            const onButtonClick = jest.fn();
            const onChildClick = jest.fn((event: ReactMouseEvent) => event.preventDefault());
            render(
                <Button asChild onClick={onButtonClick}>
                    <a href="/donate" onClick={onChildClick}>
                        Donate
                    </a>
                </Button>,
            );

            await user.click(screen.getByRole('link', { name: 'Donate' }));

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

        it.each(VARIANTS)('has no violations for variant "%s"', async variant => {
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
                    <a href="/donate">Donate</a>
                </Button>,
            );

            expect(await axe(container)).toHaveNoViolations();
        });

        // it('has no violations while loading', async () => {
        //     const { container } = render(<Button loading>Save</Button>);

        //     expect(await axe(container)).toHaveNoViolations();
        // });

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
