import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@rax-ds/ui';

export default function AccordionMultiple() {
    return (
        <Accordion type="multiple" defaultValue={['shipping', 'returns']} className="w-full max-w-md">
            <AccordionItem value="shipping">
                <AccordionTrigger>How long does shipping take?</AccordionTrigger>
                <AccordionContent>Standard shipping takes 3 to 5 business days.</AccordionContent>
            </AccordionItem>
            <AccordionItem value="returns">
                <AccordionTrigger>Can I return an item?</AccordionTrigger>
                <AccordionContent>Yes, within 30 days of delivery.</AccordionContent>
            </AccordionItem>
            <AccordionItem value="support">
                <AccordionTrigger>How do I contact support?</AccordionTrigger>
                <AccordionContent>Use the help button in the bottom corner of any page.</AccordionContent>
            </AccordionItem>
        </Accordion>
    );
}
