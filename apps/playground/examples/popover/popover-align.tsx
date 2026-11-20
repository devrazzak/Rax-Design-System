import { Button, Popover, PopoverContent, PopoverDescription, PopoverTrigger, Row } from '@rax-ds/ui';

export default function PopoverAlign() {
    return (
        <Row gap="sm" wrap justify="center">
            <Popover>
                <PopoverTrigger asChild>
                    <Button variant="outline">Start</Button>
                </PopoverTrigger>
                <PopoverContent align="start">
                    <PopoverDescription>Aligned to the start of the trigger.</PopoverDescription>
                </PopoverContent>
            </Popover>
            <Popover>
                <PopoverTrigger asChild>
                    <Button variant="outline">Center</Button>
                </PopoverTrigger>
                <PopoverContent align="center">
                    <PopoverDescription>Aligned to the center, the default.</PopoverDescription>
                </PopoverContent>
            </Popover>
            <Popover>
                <PopoverTrigger asChild>
                    <Button variant="outline">End</Button>
                </PopoverTrigger>
                <PopoverContent align="end">
                    <PopoverDescription>Aligned to the end of the trigger.</PopoverDescription>
                </PopoverContent>
            </Popover>
        </Row>
    );
}
