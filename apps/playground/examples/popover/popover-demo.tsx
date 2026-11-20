import {
    Button,
    Popover,
    PopoverContent,
    PopoverDescription,
    PopoverHeader,
    PopoverTitle,
    PopoverTrigger,
} from '@rax-ds/ui';

export default function PopoverDemo() {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="outline">Shipping details</Button>
            </PopoverTrigger>
            <PopoverContent>
                <PopoverHeader>
                    <PopoverTitle>Shipping details</PopoverTitle>
                    <PopoverDescription>Orders placed before noon ship the same day.</PopoverDescription>
                </PopoverHeader>
            </PopoverContent>
        </Popover>
    );
}
