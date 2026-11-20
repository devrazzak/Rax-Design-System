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
} from '@rax-ds/ui';

export default function DrawerNoCloseButton() {
    return (
        <Drawer>
            <DrawerTrigger asChild>
                <Button variant="outline">Open menu</Button>
            </DrawerTrigger>
            <DrawerContent side="left" showCloseButton={false}>
                <DrawerHeader>
                    <DrawerTitle>Menu</DrawerTitle>
                    <DrawerDescription>Use the button below to close the menu.</DrawerDescription>
                </DrawerHeader>
                <DrawerFooter>
                    <DrawerClose asChild>
                        <Button variant="outline">Close menu</Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
}
