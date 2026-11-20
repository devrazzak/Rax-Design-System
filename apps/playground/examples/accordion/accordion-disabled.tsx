import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@rax-ds/ui';

export default function AccordionDisabled() {
    return (
        <Accordion type="single" collapsible className="w-full max-w-md">
            <AccordionItem value="shipping">
                <AccordionTrigger>How long does shipping take?</AccordionTrigger>
                <AccordionContent>Standard shipping takes 3 to 5 business days.</AccordionContent>
            </AccordionItem>
            <AccordionItem value="international" disabled>
                <AccordionTrigger>Do you ship abroad? (unavailable)</AccordionTrigger>
                <AccordionContent>Not yet.</AccordionContent>
            </AccordionItem>
        </Accordion>
    );
}
