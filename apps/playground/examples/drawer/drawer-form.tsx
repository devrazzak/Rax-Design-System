import {
    Button,
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
    Field,
    FieldLabel,
    Textarea,
} from '@rax-ds/ui';

export default function DrawerForm() {
    return (
        <Drawer>
            <DrawerTrigger asChild>
                <Button>Write a note</Button>
            </DrawerTrigger>
            <DrawerContent closeOnOutsideClick={false}>
                <DrawerHeader>
                    <DrawerTitle>New note</DrawerTitle>
                    <DrawerDescription>The drawer stays open when you click outside it.</DrawerDescription>
                </DrawerHeader>
                <Field className="px-4">
                    <FieldLabel htmlFor="drawer-form-note">Note</FieldLabel>
                    <Textarea id="drawer-form-note" placeholder="Write something" />
                </Field>
                <DrawerFooter>
                    <DrawerClose asChild>
                        <Button>Save note</Button>
                    </DrawerClose>
                    <DrawerClose asChild>
                        <Button variant="outline">Discard</Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
}
