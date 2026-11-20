import { Accordion, AccordionContent, AccordionItem, AccordionTrigger, Stack } from '@rax-ds/ui';

export default function AccordionSizes() {
    return (
        <Stack gap="lg" className="w-full max-w-md">
            <Accordion type="single" collapsible size="sm" defaultValue="item">
                <AccordionItem value="item">
                    <AccordionTrigger>Small</AccordionTrigger>
                    <AccordionContent>Small text and trigger height.</AccordionContent>
                </AccordionItem>
            </Accordion>
            <Accordion type="single" collapsible size="md" defaultValue="item">
                <AccordionItem value="item">
                    <AccordionTrigger>Medium, the default</AccordionTrigger>
                    <AccordionContent>Medium text and trigger height.</AccordionContent>
                </AccordionItem>
            </Accordion>
            <Accordion type="single" collapsible size="lg" defaultValue="item">
                <AccordionItem value="item">
                    <AccordionTrigger>Large</AccordionTrigger>
                    <AccordionContent>Large text and trigger height.</AccordionContent>
                </AccordionItem>
            </Accordion>
            <Accordion type="single" collapsible size="xl" defaultValue="item">
                <AccordionItem value="item">
                    <AccordionTrigger>Extra large</AccordionTrigger>
                    <AccordionContent>Extra large text and trigger height.</AccordionContent>
                </AccordionItem>
            </Accordion>
        </Stack>
    );
}
