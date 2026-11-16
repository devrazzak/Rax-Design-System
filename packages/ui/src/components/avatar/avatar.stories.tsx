import type { Meta, StoryObj } from '@storybook/react-vite';

import { Avatar, AvatarBadge, AvatarFallback, AvatarGroup, AvatarGroupCount, AvatarImage } from './avatar';
import { AVATAR_SIZES } from './avatar.variants';

/** A small inline picture, so the stories do not need the network. */
const IMAGE_SRC =
    "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'><rect width='64' height='64' fill='%2338bdf8'/><circle cx='32' cy='26' r='12' fill='white'/><path d='M10 64c0-14 10-22 22-22s22 8 22 22z' fill='white'/></svg>";

const meta = {
    title: 'Components/Avatar',
    component: Avatar,
    tags: ['autodocs'],
    argTypes: {
        size: { control: 'inline-radio', options: AVATAR_SIZES },
    },
    render: args => (
        <Avatar {...args}>
            <AvatarImage src={IMAGE_SRC} alt="Razzak" />
            <AvatarFallback>AR</AvatarFallback>
        </Avatar>
    ),
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

/* stories */
export const Default: Story = {};

/** The fallback shows when there is no image, or the image fails to load. */
export const Fallback: Story = {
    render: args => (
        <Avatar {...args}>
            <AvatarImage src="/does-not-exist.png" alt="Razzak" />
            <AvatarFallback>AR</AvatarFallback>
        </Avatar>
    ),
};

export const Sizes: Story = {
    render: args => (
        <div className="flex flex-wrap items-center gap-3">
            {AVATAR_SIZES.map(size => (
                <Avatar key={size} {...args} size={size}>
                    <AvatarImage src={IMAGE_SRC} alt={`Razzak, ${size}`} />
                    <AvatarFallback>AR</AvatarFallback>
                </Avatar>
            ))}
        </div>
    ),
};

export const FallbackSizes: Story = {
    render: args => (
        <div className="flex flex-wrap items-center gap-3">
            {AVATAR_SIZES.map(size => (
                <Avatar key={size} {...args} size={size}>
                    <AvatarFallback>AR</AvatarFallback>
                </Avatar>
            ))}
        </div>
    ),
};

/** The badge grows with the avatar. */
export const WithBadge: Story = {
    render: args => (
        <div className="flex flex-wrap items-center gap-3">
            {AVATAR_SIZES.map(size => (
                <Avatar key={size} {...args} size={size}>
                    <AvatarImage src={IMAGE_SRC} alt={`Razzak, ${size}`} />
                    <AvatarFallback>AR</AvatarFallback>
                    <AvatarBadge role="img" aria-label="Online" />
                </Avatar>
            ))}
        </div>
    ),
};

/** Give each avatar, and the count, the same size. */
export const Group: Story = {
    render: args => (
        <AvatarGroup>
            <Avatar {...args}>
                <AvatarImage src={IMAGE_SRC} alt="Razzak" />
                <AvatarFallback>AR</AvatarFallback>
            </Avatar>
            <Avatar {...args}>
                <AvatarFallback>SK</AvatarFallback>
            </Avatar>
            <Avatar {...args}>
                <AvatarFallback>MH</AvatarFallback>
            </Avatar>
            <AvatarGroupCount size={args.size}>+3</AvatarGroupCount>
        </AvatarGroup>
    ),
};
