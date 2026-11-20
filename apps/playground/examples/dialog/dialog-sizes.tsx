import {
    Button,
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    Row,
} from '@rax-ds/ui';

export default function DialogSizes() {
    return (
        <Row gap="sm" wrap justify="center">
            <Dialog>
                <DialogTrigger asChild>
                    <Button variant="outline">Small</Button>
                </DialogTrigger>
                <DialogContent size="sm">
                    <DialogHeader>
                        <DialogTitle>Small dialog</DialogTitle>
                        <DialogDescription>The width stops at the small size.</DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
            <Dialog>
                <DialogTrigger asChild>
                    <Button variant="outline">Medium</Button>
                </DialogTrigger>
                <DialogContent size="md">
                    <DialogHeader>
                        <DialogTitle>Medium dialog</DialogTitle>
                        <DialogDescription>The width stops at the medium size, the default.</DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
            <Dialog>
                <DialogTrigger asChild>
                    <Button variant="outline">Large</Button>
                </DialogTrigger>
                <DialogContent size="lg">
                    <DialogHeader>
                        <DialogTitle>Large dialog</DialogTitle>
                        <DialogDescription>The width stops at the large size.</DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
            <Dialog>
                <DialogTrigger asChild>
                    <Button variant="outline">Extra large</Button>
                </DialogTrigger>
                <DialogContent size="xl">
                    <DialogHeader>
                        <DialogTitle>Extra large dialog</DialogTitle>
                        <DialogDescription>The width stops at the extra large size.</DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
            <Dialog>
                <DialogTrigger asChild>
                    <Button variant="outline">Full</Button>
                </DialogTrigger>
                <DialogContent size="full">
                    <DialogHeader>
                        <DialogTitle>Full dialog</DialogTitle>
                        <DialogDescription>
                            The dialog fills the screen width and keeps a small margin.
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </Row>
    );
}
