import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react-vite';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './accordion';
import { ACCORDION_SIZES } from './accordion.variants';

const FAQ = [
    {
        value: 'shipping',
        question: 'How long does shipping take?',
        answer: 'Orders arrive within 3 to 5 business days.',
    },
    { value: 'returns', question: 'Can I return an item?', answer: 'Yes, within 30 days if it is unused.' },
    {
        value: 'support',
        question: 'How do I contact support?',
        answer: 'Use the chat in the corner or send us an email.',
    },
];

/** Items of the sample FAQ, so the stories do not repeat the same markup. A prefix keeps the names unique when one story shows several accordions. */
function FaqItems({ prefix = '', disabledValue }: { prefix?: string; disabledValue?: string }) {
    return FAQ.map(item => (
        <AccordionItem key={item.value} value={item.value} disabled={item.value === disabledValue}>
            <AccordionTrigger>
                {prefix}
                {item.question}
            </AccordionTrigger>
            <AccordionContent>{item.answer}</AccordionContent>
        </AccordionItem>
    ));
}

const meta = {
    title: 'Components/Accordion',
    component: Accordion,
    tags: ['autodocs'],
    args: { type: 'single', collapsible: true },
    argTypes: {
        type: { control: 'inline-radio', options: ['single', 'multiple'] },
        size: { control: 'inline-radio', options: ACCORDION_SIZES },
        disabled: { control: 'boolean' },
    },
    decorators: [
        Story => (
            <div className="w-96">
                <Story />
            </div>
        ),
    ],
} satisfies Meta<typeof Accordion>;

export default meta;
// The root props are a union (single or multiple), so the stories pass their own props instead of typed args
type Story = StoryObj;

const SINGLE = { type: 'single', collapsible: true } as const;

/* stories */
export const Default: Story = {
    render: () => (
        <Accordion {...SINGLE}>
            <FaqItems />
        </Accordion>
    ),
};

export const DefaultOpen: Story = {
    render: () => (
        <Accordion {...SINGLE} defaultValue="returns">
            <FaqItems />
        </Accordion>
    ),
};

export const Multiple: Story = {
    render: () => (
        <Accordion type="multiple" defaultValue={['shipping', 'support']}>
            <FaqItems />
        </Accordion>
    ),
};

export const Sizes: Story = {
    render: () => (
        <div className="flex flex-col gap-8">
            {ACCORDION_SIZES.map(size => (
                <Accordion key={size} {...SINGLE} size={size} defaultValue="shipping">
                    <FaqItems prefix={`${size}: `} />
                </Accordion>
            ))}
        </div>
    ),
};

export const Controlled: Story = {
    render: () => {
        const [value, setValue] = useState('shipping');

        return (
            <div className="flex flex-col gap-4">
                <Accordion type="single" collapsible value={value} onValueChange={setValue}>
                    <FaqItems />
                </Accordion>
                <p className="text-sm text-muted-foreground">Open item: {value || 'none'}</p>
            </div>
        );
    },
};

export const Disabled: Story = {
    render: () => (
        <div className="flex flex-col gap-8">
            <Accordion {...SINGLE}>
                <FaqItems disabledValue="returns" />
            </Accordion>
            <Accordion {...SINGLE} disabled>
                <FaqItems />
            </Accordion>
        </div>
    ),
};
