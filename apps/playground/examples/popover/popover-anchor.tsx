import {
    Button,
    Popover,
    PopoverAnchor,
    PopoverContent,
    PopoverDescription,
    PopoverTrigger,
    Row,
    Text,
} from '@rax-ds/ui';

export default function PopoverAnchorExample() {
    return (
        <Popover>
            <Row gap="md">
                <PopoverAnchor asChild>
                    <Text weight="medium">Order 1042</Text>
                </PopoverAnchor>
                <PopoverTrigger asChild>
                    <Button variant="outline" size="sm">
                        Details
                    </Button>
                </PopoverTrigger>
            </Row>
            <PopoverContent align="start">
                <PopoverDescription>
                    The popover is positioned against the order name, not the button.
                </PopoverDescription>
            </PopoverContent>
        </Popover>
    );
}
