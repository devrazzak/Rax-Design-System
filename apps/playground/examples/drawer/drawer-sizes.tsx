import {
    Button,
    Drawer,
    DrawerContent,
    DrawerDescription,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
    Row,
} from '@rax-ds/ui';

export default function DrawerSizes() {
    return (
        <Row gap="sm" wrap justify="center">
            <Drawer>
                <DrawerTrigger asChild>
                    <Button variant="outline">Small</Button>
                </DrawerTrigger>
                <DrawerContent size="sm">
                    <DrawerHeader>
                        <DrawerTitle>Small drawer</DrawerTitle>
                        <DrawerDescription>The width stops at the small size.</DrawerDescription>
                    </DrawerHeader>
                </DrawerContent>
            </Drawer>
            <Drawer>
                <DrawerTrigger asChild>
                    <Button variant="outline">Medium</Button>
                </DrawerTrigger>
                <DrawerContent size="md">
                    <DrawerHeader>
                        <DrawerTitle>Medium drawer</DrawerTitle>
                        <DrawerDescription>The width stops at the medium size, the default.</DrawerDescription>
                    </DrawerHeader>
                </DrawerContent>
            </Drawer>
            <Drawer>
                <DrawerTrigger asChild>
                    <Button variant="outline">Large</Button>
                </DrawerTrigger>
                <DrawerContent size="lg">
                    <DrawerHeader>
                        <DrawerTitle>Large drawer</DrawerTitle>
                        <DrawerDescription>The width stops at the large size.</DrawerDescription>
                    </DrawerHeader>
                </DrawerContent>
            </Drawer>
            <Drawer>
                <DrawerTrigger asChild>
                    <Button variant="outline">Extra large</Button>
                </DrawerTrigger>
                <DrawerContent size="xl">
                    <DrawerHeader>
                        <DrawerTitle>Extra large drawer</DrawerTitle>
                        <DrawerDescription>The width stops at the extra large size.</DrawerDescription>
                    </DrawerHeader>
                </DrawerContent>
            </Drawer>
            <Drawer>
                <DrawerTrigger asChild>
                    <Button variant="outline">Full</Button>
                </DrawerTrigger>
                <DrawerContent size="full">
                    <DrawerHeader>
                        <DrawerTitle>Full drawer</DrawerTitle>
                        <DrawerDescription>
                            The drawer fills the screen width and keeps a small margin.
                        </DrawerDescription>
                    </DrawerHeader>
                </DrawerContent>
            </Drawer>
        </Row>
    );
}
