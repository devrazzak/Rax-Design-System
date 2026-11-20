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

export default function DrawerDemo() {
    return (
        <Drawer>
            <DrawerTrigger asChild>
                <Button variant="outline">Open filters</Button>
            </DrawerTrigger>
            <DrawerContent>
                <DrawerHeader>
                    <DrawerTitle>Filters</DrawerTitle>
                    <DrawerDescription>Narrow down the list of recent orders.</DrawerDescription>
                </DrawerHeader>
                <DrawerFooter>
                    <DrawerClose asChild>
                        <Button>Apply filters</Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
}
