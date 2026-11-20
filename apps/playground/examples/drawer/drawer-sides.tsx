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

export default function DrawerSides() {
    return (
        <Row gap="sm" wrap justify="center">
            <Drawer>
                <DrawerTrigger asChild>
                    <Button variant="outline">Right</Button>
                </DrawerTrigger>
                <DrawerContent side="right">
                    <DrawerHeader>
                        <DrawerTitle>Right drawer</DrawerTitle>
                        <DrawerDescription>Slides in from the right edge, the default.</DrawerDescription>
                    </DrawerHeader>
                </DrawerContent>
            </Drawer>
            <Drawer>
                <DrawerTrigger asChild>
                    <Button variant="outline">Left</Button>
                </DrawerTrigger>
                <DrawerContent side="left">
                    <DrawerHeader>
                        <DrawerTitle>Left drawer</DrawerTitle>
                        <DrawerDescription>Slides in from the left edge.</DrawerDescription>
                    </DrawerHeader>
                </DrawerContent>
            </Drawer>
            <Drawer>
                <DrawerTrigger asChild>
                    <Button variant="outline">Top</Button>
                </DrawerTrigger>
                <DrawerContent side="top">
                    <DrawerHeader>
                        <DrawerTitle>Top drawer</DrawerTitle>
                        <DrawerDescription>Slides in from the top edge and fills the width.</DrawerDescription>
                    </DrawerHeader>
                </DrawerContent>
            </Drawer>
            <Drawer>
                <DrawerTrigger asChild>
                    <Button variant="outline">Bottom</Button>
                </DrawerTrigger>
                <DrawerContent side="bottom">
                    <DrawerHeader>
                        <DrawerTitle>Bottom drawer</DrawerTitle>
                        <DrawerDescription>Slides in from the bottom edge and fills the width.</DrawerDescription>
                    </DrawerHeader>
                </DrawerContent>
            </Drawer>
        </Row>
    );
}
