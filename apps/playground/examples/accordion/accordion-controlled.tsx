'use client';

import { useState } from 'react';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger, Stack, Text } from '@rax-ds/ui';

export default function AccordionControlled() {
    const [value, setValue] = useState('shipping');

    return (
        <Stack gap="sm" className="w-full max-w-md">
            <Accordion type="single" collapsible value={value} onValueChange={setValue}>
                <AccordionItem value="shipping">
                    <AccordionTrigger>How long does shipping take?</AccordionTrigger>
                    <AccordionContent>Standard shipping takes 3 to 5 business days.</AccordionContent>
                </AccordionItem>
                <AccordionItem value="returns">
                    <AccordionTrigger>Can I return an item?</AccordionTrigger>
                    <AccordionContent>Yes, within 30 days of delivery.</AccordionContent>
                </AccordionItem>
            </Accordion>
            <Text size="sm" color="muted">
                Open item: {value || 'none'}
            </Text>
        </Stack>
    );
}
