import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';

import type { AvatarProps } from './avatar';
import { Avatar, AvatarBadge, AvatarFallback, AvatarGroup, AvatarGroupCount, AvatarImage } from './avatar';
import { AVATAR_SIZES, defaultSize, sizeClasses } from './avatar.variants';

/** jsdom never loads images, so Radix would stay on the fallback. This stands in for the browser's Image. */
type ImageListener = (event: { currentTarget: unknown }) => void;

function mockImage(outcome: 'load' | 'error') {
    const originalImage = window.Image;

    window.Image = class {
        referrerPolicy = '';
        crossOrigin: string | null = null;
        currentSrc = '';
        complete = false;
        naturalWidth = 0;
        private listeners: Record<string, ImageListener[]> = {};

        addEventListener(type: string, listener: ImageListener) {
            (this.listeners[type] ??= []).push(listener);
        }

        removeEventListener(type: string, listener: ImageListener) {
            this.listeners[type] = (this.listeners[type] ?? []).filter(item => item !== listener);
        }

        // Setting src starts the "download", which ends with a load or an error event
        set src(value: string) {
            this.currentSrc = value;
            setTimeout(() => {
                this.complete = true;
                this.naturalWidth = outcome === 'load' ? 1 : 0;
                this.listeners[outcome]?.forEach(listener => listener({ currentTarget: this }));
            });
        }
    } as unknown as typeof Image;

    return () => {
        window.Image = originalImage;
    };
}

/** An avatar with the usual parts. */
function TestAvatar({ size, className }: Pick<AvatarProps, 'size' | 'className'>) {
    return (
        <Avatar size={size} className={className} data-testid="avatar">
            <AvatarImage src="/razzak.png" alt="Razzak" />
            <AvatarFallback>AR</AvatarFallback>
            <AvatarBadge role="img" aria-label="Online" />
        </Avatar>
    );
}

describe('Avatar', () => {
    let restoreImage: (() => void) | undefined;

    afterEach(() => {
        restoreImage?.();
        restoreImage = undefined;
    });

    describe('behavior', () => {
        it('shows the fallback while the image has not loaded', () => {
            render(<TestAvatar />);

            expect(screen.getByText('AR')).toBeInTheDocument();
            expect(screen.queryByRole('img', { name: 'Razzak' })).not.toBeInTheDocument();
        });

        it('shows the image once it has loaded', async () => {
            restoreImage = mockImage('load');
            render(<TestAvatar />);

            expect(await screen.findByRole('img', { name: 'Razzak' })).toHaveAttribute('src', '/razzak.png');
            expect(screen.queryByText('AR')).not.toBeInTheDocument();
        });

        it('keeps the fallback when the image fails to load', async () => {
            restoreImage = mockImage('error');
            render(<TestAvatar />);

            // The error arrives in a later task, so wait for it before checking
            await new Promise(resolve => setTimeout(resolve, 10));

            expect(screen.getByText('AR')).toBeInTheDocument();
            expect(screen.queryByRole('img', { name: 'Razzak' })).not.toBeInTheDocument();
        });

        it('shows the fallback when there is no image part', () => {
            render(
                <Avatar>
                    <AvatarFallback>AR</AvatarFallback>
                </Avatar>,
            );

            expect(screen.getByText('AR')).toBeInTheDocument();
        });
    });

    describe('accessibility', () => {
        it('names the image with its alt text', async () => {
            restoreImage = mockImage('load');
            render(<TestAvatar />);

            expect(await screen.findByRole('img', { name: 'Razzak' })).toBeInTheDocument();
        });

        it('exposes the badge label', () => {
            render(<TestAvatar />);

            expect(screen.getByRole('img', { name: 'Online' })).toHaveAttribute('data-slot', 'avatar-badge');
        });

        it('has no axe violations', async () => {
            const { container } = render(<TestAvatar />);

            expect(await axe(container)).toHaveNoViolations();
        });

        it('has no axe violations with a loaded image', async () => {
            restoreImage = mockImage('load');
            const { container } = render(<TestAvatar />);
            await screen.findByRole('img', { name: 'Razzak' });

            expect(await axe(container)).toHaveNoViolations();
        });
    });

    describe('size', () => {
        it('uses the md size by default', () => {
            render(<TestAvatar />);

            expect(defaultSize).toBe('md');
            expect(screen.getByTestId('avatar')).toHaveAttribute('data-size', 'md');
            expect(screen.getByTestId('avatar')).toHaveClass('size-10', 'text-sm');
        });

        it.each(AVATAR_SIZES)('applies size "%s"', size => {
            render(<TestAvatar size={size} />);

            const avatar = screen.getByTestId('avatar');
            expect(avatar).toHaveAttribute('data-size', size);
            expect(avatar).toHaveClass(sizeClasses[size]);
        });
    });

    describe('group', () => {
        it('renders its avatars and the count', () => {
            render(
                <AvatarGroup>
                    <Avatar>
                        <AvatarFallback>AR</AvatarFallback>
                    </Avatar>
                    <Avatar>
                        <AvatarFallback>SK</AvatarFallback>
                    </Avatar>
                    <AvatarGroupCount>+3</AvatarGroupCount>
                </AvatarGroup>,
            );

            expect(screen.getByText('AR')).toBeInTheDocument();
            expect(screen.getByText('SK')).toBeInTheDocument();
            expect(screen.getByText('+3')).toBeInTheDocument();
        });

        it('gives the count the md size by default', () => {
            render(<AvatarGroupCount>+3</AvatarGroupCount>);

            expect(screen.getByText('+3')).toHaveClass('size-10', 'text-sm');
        });

        it.each(AVATAR_SIZES)('gives the count size "%s"', size => {
            render(<AvatarGroupCount size={size}>+3</AvatarGroupCount>);

            expect(screen.getByText('+3')).toHaveClass(sizeClasses[size]);
        });
    });

    describe('customization', () => {
        it('sets a data-slot on every part', async () => {
            restoreImage = mockImage('load');
            render(
                <AvatarGroup>
                    <TestAvatar />
                    <AvatarGroupCount>+3</AvatarGroupCount>
                </AvatarGroup>,
            );

            expect(screen.getByTestId('avatar')).toHaveAttribute('data-slot', 'avatar');
            expect(await screen.findByRole('img', { name: 'Razzak' })).toHaveAttribute('data-slot', 'avatar-image');
            expect(screen.getByRole('img', { name: 'Online' })).toHaveAttribute('data-slot', 'avatar-badge');
            expect(screen.getByText('+3')).toHaveAttribute('data-slot', 'avatar-group-count');
            expect(screen.getByTestId('avatar').parentElement).toHaveAttribute('data-slot', 'avatar-group');
        });

        it('sets a data-slot on the fallback', () => {
            render(<TestAvatar />);

            expect(screen.getByText('AR')).toHaveAttribute('data-slot', 'avatar-fallback');
        });

        it('lets a custom className override the size', () => {
            render(<TestAvatar className="size-20" />);

            const avatar = screen.getByTestId('avatar');
            expect(avatar).toHaveClass('size-20');
            expect(avatar).not.toHaveClass('size-10');
        });

        it('lets a custom className override the shape', () => {
            render(<TestAvatar className="rounded-md" />);

            const avatar = screen.getByTestId('avatar');
            expect(avatar).toHaveClass('rounded-md');
            expect(avatar).not.toHaveClass('rounded-full');
        });
    });
});
