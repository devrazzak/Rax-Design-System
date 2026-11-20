import {
    Button,
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    Field,
    FieldGroup,
    FieldLabel,
    Input,
} from '@rax-ds/ui';

export default function DialogForm() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>Edit profile</Button>
            </DialogTrigger>
            <DialogContent size="md">
                <DialogHeader>
                    <DialogTitle>Edit profile</DialogTitle>
                    <DialogDescription>Change your name and email. Save when you are done.</DialogDescription>
                </DialogHeader>
                <FieldGroup>
                    <Field>
                        <FieldLabel htmlFor="dialog-form-name">Name</FieldLabel>
                        <Input id="dialog-form-name" defaultValue="Alex Morgan" />
                    </Field>
                    <Field>
                        <FieldLabel htmlFor="dialog-form-email">Email</FieldLabel>
                        <Input id="dialog-form-email" type="email" defaultValue="alex@example.com" />
                    </Field>
                </FieldGroup>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <DialogClose asChild>
                        <Button>Save changes</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
