import type { Meta, StoryObj } from '@storybook/react-vite';
import { SearchIcon } from '@/icons';

import {
    Breadcrumb,
    BreadcrumbEllipsis,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from './breadcrumb';
import { BREADCRUMB_SIZES } from './breadcrumb.variants';

const meta = {
    title: 'Components/Breadcrumb',
    component: Breadcrumb,
    tags: ['autodocs'],
    argTypes: {
        size: { control: 'inline-radio', options: BREADCRUMB_SIZES },
    },
} satisfies Meta<typeof Breadcrumb>;

export default meta;
type Story = StoryObj<typeof meta>;

/* stories */
export const Default: Story = {
    render: args => (
        <Breadcrumb {...args}>
            <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbLink href="#home">Home</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                    <BreadcrumbLink href="#components">Components</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                    <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
                </BreadcrumbItem>
            </BreadcrumbList>
        </Breadcrumb>
    ),
};

export const Sizes: Story = {
    render: args => (
        <div className="flex flex-col gap-4">
            {BREADCRUMB_SIZES.map(size => (
                <Breadcrumb key={size} {...args} size={size}>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink href="#home">Home</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbEllipsis />
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage>{size}</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            ))}
        </div>
    ),
};

/** Collapse the middle of a long trail with `BreadcrumbEllipsis`. */
export const WithEllipsis: Story = {
    render: args => (
        <Breadcrumb {...args}>
            <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbLink href="#home">Home</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                    <BreadcrumbEllipsis />
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                    <BreadcrumbLink href="#components">Components</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                    <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
                </BreadcrumbItem>
            </BreadcrumbList>
        </Breadcrumb>
    ),
};

/** Any element can be the separator. Icons from `@/icons` follow the text size. */
export const CustomSeparator: Story = {
    render: args => (
        <Breadcrumb {...args}>
            <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbLink href="#home">Home</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator>/</BreadcrumbSeparator>
                <BreadcrumbItem>
                    <BreadcrumbLink href="#search">
                        <SearchIcon />
                    </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator>/</BreadcrumbSeparator>
                <BreadcrumbItem>
                    <BreadcrumbPage>Results</BreadcrumbPage>
                </BreadcrumbItem>
            </BreadcrumbList>
        </Breadcrumb>
    ),
};

/** With `asChild` the link becomes your own element, e.g. a Next.js `<Link>`. */
export const AsLink: Story = {
    render: args => (
        <Breadcrumb {...args}>
            <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                        <button type="button">Home</button>
                    </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                    <BreadcrumbPage>Current page</BreadcrumbPage>
                </BreadcrumbItem>
            </BreadcrumbList>
        </Breadcrumb>
    ),
};
