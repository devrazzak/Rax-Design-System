import {
    Button,
    Field,
    FieldLabel,
    Input,
    Popover,
    PopoverContent,
    PopoverHeader,
    PopoverTitle,
    PopoverTrigger,
} from '@rax-ds/ui';

export default function PopoverForm() {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="outline">Rename project</Button>
            </PopoverTrigger>
            <PopoverContent>
                <PopoverHeader>
                    <PopoverTitle>Rename project</PopoverTitle>
                </PopoverHeader>
                <Field>
                    <FieldLabel htmlFor="popover-form-name" size="sm">
                        Name
                    </FieldLabel>
                    <Input id="popover-form-name" size="sm" defaultValue="Dashboard" />
                </Field>
            </PopoverContent>
        </Popover>
    );
}
