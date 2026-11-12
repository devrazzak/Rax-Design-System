import type { SubmitEvent } from 'react';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';

import { Button } from './button';

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
    });

    describe('loading', () => {
        it('keeps the accessible name and announces the busy state', () => {
            render(<Button loading>Donate</Button>);

            const button = screen.getByRole('button', { name: 'Donate' });
            expect(button).toHaveAttribute('aria-busy', 'true');
            expect(button).toHaveAttribute('aria-disabled', 'true');
        });

        it('does not call onClick while loading', async () => {
            const user = userEvent.setup();
            const onClick = jest.fn();
            render(
                <Button loading onClick={onClick}>
                    Donate
                </Button>,
            );

            await user.click(screen.getByRole('button', { name: 'Donate' }));

            expect(onClick).not.toHaveBeenCalled();
        });

        it('submits the form when not loading (control case)', async () => {
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

        it('does not submit the form while loading', async () => {
            const user = userEvent.setup();
            const onSubmit = createSubmitHandler();
            render(
                <form onSubmit={onSubmit}>
                    <Button type="submit" loading>
                        Donate
                    </Button>
                </form>,
            );

            await user.click(screen.getByRole('button', { name: 'Donate' }));

            expect(onSubmit).not.toHaveBeenCalled();
        });

        it('keeps keyboard focus when loading starts', () => {
            const { rerender } = render(<Button>Donate</Button>);
            const button = screen.getByRole('button', { name: 'Donate' });
            button.focus();

            rerender(<Button loading>Donate</Button>);

            expect(button).toHaveFocus();
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
    });

    describe('styling', () => {
        it('lets consumer className override conflicting variant classes', () => {
            render(<Button className="px-10">Save</Button>);

            const button = screen.getByRole('button', { name: 'Save' });
            expect(button).toHaveClass('px-10');
            expect(button).not.toHaveClass('px-4');
        });
    });

    describe('accessibility', () => {
        it('has no violations in the default state', async () => {
            const { container } = render(<Button>Save</Button>);

            expect(await axe(container)).toHaveNoViolations();
        });

        it('has no violations while loading', async () => {
            const { container } = render(<Button loading>Save</Button>);

            expect(await axe(container)).toHaveNoViolations();
        });

        it('has no violations as an icon-only button with aria-label', async () => {
            const { container } = render(
                <Button size="icon" aria-label="Send email">
                    <svg aria-hidden="true" />
                </Button>,
            );

            expect(await axe(container)).toHaveNoViolations();
        });
    });
});
