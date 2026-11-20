import { Button, Popover, PopoverContent, PopoverDescription, PopoverTrigger, Row } from '@rax-ds/ui';

export default function PopoverSide() {
    return (
        <Row gap="sm" wrap justify="center">
            <Popover>
                <PopoverTrigger asChild>
                    <Button variant="outline">Top</Button>
                </PopoverTrigger>
                <PopoverContent side="top">
                    <PopoverDescription>Opens above the trigger.</PopoverDescription>
                </PopoverContent>
            </Popover>
            <Popover>
                <PopoverTrigger asChild>
                    <Button variant="outline">Right</Button>
                </PopoverTrigger>
                <PopoverContent side="right">
                    <PopoverDescription>Opens to the right of the trigger.</PopoverDescription>
                </PopoverContent>
            </Popover>
            <Popover>
                <PopoverTrigger asChild>
                    <Button variant="outline">Bottom</Button>
                </PopoverTrigger>
                <PopoverContent side="bottom">
                    <PopoverDescription>Opens below the trigger, the default.</PopoverDescription>
                </PopoverContent>
            </Popover>
            <Popover>
                <PopoverTrigger asChild>
                    <Button variant="outline">Left</Button>
                </PopoverTrigger>
                <PopoverContent side="left">
                    <PopoverDescription>Opens to the left of the trigger.</PopoverDescription>
                </PopoverContent>
            </Popover>
        </Row>
    );
}
