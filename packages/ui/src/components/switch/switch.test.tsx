import { useState } from 'react';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';

import { Label } from '@/components/label/label';

import { Switch } from './switch';
import { defaultSize, sizeClasses, SWITCH_SIZES } from './switch.variants';

function ControlledSwitch() {
    const [checked, setChecked] = useState(false);
    return (
        <>
            <Switch aria-label="Notifications" checked={checked} onCheckedChange={setChecked} />
            <button type="button" onClick={() => setChecked(true)}>
                Turn on
            </button>
        </>
    );
}

describe('Switch', () => {
    describe('behavior', () => {
        it('is off by default and toggles on click', async () => {
            const user = userEvent.setup();
            render(<Switch aria-label="Notifications" />);
            const toggle = screen.getByRole('switch', { name: 'Notifications' });

            expect(toggle).not.toBeChecked();

            await user.click(toggle);
            expect(toggle).toBeChecked();

            await user.click(toggle);
            expect(toggle).not.toBeChecked();
        });

        it('starts on with defaultChecked', () => {
            render(<Switch aria-label="Notifications" defaultChecked />);

            expect(screen.getByRole('switch', { name: 'Notifications' })).toBeChecked();
        });

        it('reports each change through onCheckedChange', async () => {
            const user = userEvent.setup();
            const onCheckedChange = jest.fn();
            render(<Switch aria-label="Notifications" onCheckedChange={onCheckedChange} />);

            await user.click(screen.getByRole('switch', { name: 'Notifications' }));
            await user.click(screen.getByRole('switch', { name: 'Notifications' }));

            expect(onCheckedChange).toHaveBeenNthCalledWith(1, true);
            expect(onCheckedChange).toHaveBeenNthCalledWith(2, false);
        });

        it('follows a controlled value', async () => {
            const user = userEvent.setup();
            render(<ControlledSwitch />);
            const toggle = screen.getByRole('switch', { name: 'Notifications' });

            expect(toggle).not.toBeChecked();

            await user.click(screen.getByRole('button', { name: 'Turn on' }));
            expect(toggle).toBeChecked();

            await user.click(toggle);
            expect(toggle).not.toBeChecked();
        });

        it('toggles when its label is clicked', async () => {
            const user = userEvent.setup();
            render(
                <>
                    <Switch id="email" />
                    <Label htmlFor="email">Email notifications</Label>
                </>,
            );

            await user.click(screen.getByText('Email notifications'));

            expect(screen.getByRole('switch', { name: 'Email notifications' })).toBeChecked();
        });
    });

    describe('keyboard', () => {
        it('toggles with the Space key', async () => {
            const user = userEvent.setup();
            render(<Switch aria-label="Notifications" />);

            await user.tab();
            await user.keyboard(' ');

            expect(screen.getByRole('switch', { name: 'Notifications' })).toBeChecked();
        });

        it('toggles with the Enter key', async () => {
            const user = userEvent.setup();
            render(<Switch aria-label="Notifications" />);

            await user.tab();
            await user.keyboard('{Enter}');

            expect(screen.getByRole('switch', { name: 'Notifications' })).toBeChecked();
        });
    });

    describe('disabled', () => {
        it('does not toggle when disabled', async () => {
            const user = userEvent.setup();
            const onCheckedChange = jest.fn();
            render(<Switch aria-label="Notifications" disabled onCheckedChange={onCheckedChange} />);

            await user.click(screen.getByRole('switch', { name: 'Notifications' }));

            expect(screen.getByRole('switch', { name: 'Notifications' })).toBeDisabled();
            expect(screen.getByRole('switch', { name: 'Notifications' })).not.toBeChecked();
            expect(onCheckedChange).not.toHaveBeenCalled();
        });
    });

    describe('form', () => {
        it('submits its value only while on', async () => {
            const user = userEvent.setup();
            render(
                <form data-testid="form">
                    <Switch name="notify" aria-label="Notifications" />
                </form>,
            );
            const form = screen.getByTestId<HTMLFormElement>('form');

            expect(new FormData(form).get('notify')).toBeNull();

            await user.click(screen.getByRole('switch', { name: 'Notifications' }));

            expect(new FormData(form).get('notify')).toBe('on');
        });
    });

    describe('invalid', () => {
        it('passes aria-invalid through', () => {
            render(<Switch aria-label="Notifications" aria-invalid />);

            expect(screen.getByRole('switch', { name: 'Notifications' })).toHaveAttribute('aria-invalid', 'true');
        });
    });

    describe('sizes', () => {
        it('uses the md size by default', () => {
            render(<Switch aria-label="Notifications" />);

            expect(defaultSize).toBe('md');
            expect(screen.getByRole('switch', { name: 'Notifications' })).toHaveClass('h-6', 'w-11');
        });

        it.each(SWITCH_SIZES)('applies the %s size classes', size => {
            render(<Switch aria-label="Notifications" size={size} />);

            // Only the track classes; the thumb classes sit on the child span.
            const trackClasses = sizeClasses[size].split(' ').filter(name => !name.includes('['));
            expect(screen.getByRole('switch', { name: 'Notifications' })).toHaveClass(...trackClasses);
        });
    });

    describe('customization', () => {
        it('merges a custom className', () => {
            render(<Switch aria-label="Notifications" className="custom-class" />);

            expect(screen.getByRole('switch', { name: 'Notifications' })).toHaveClass('custom-class');
        });

        it('sets data-slot on the track and the thumb', () => {
            render(<Switch aria-label="Notifications" />);

            expect(screen.getByRole('switch', { name: 'Notifications' })).toHaveAttribute('data-slot', 'switch');
            expect(document.querySelector('[data-slot="switch-thumb"]')).toBeInTheDocument();
        });
    });

    describe('accessibility', () => {
        it('has no axe violations', async () => {
            const { container } = render(
                <>
                    <Switch id="a-notify" />
                    <Label htmlFor="a-notify">Email notifications</Label>
                </>,
            );

            expect(await axe(container)).toHaveNoViolations();
        });
    });
});
