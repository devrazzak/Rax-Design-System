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
} from '@rax-ds/ui';

export default function DialogNoCloseButton() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">Open dialog</Button>
            </DialogTrigger>
            <DialogContent size="sm" showCloseButton={false}>
                <DialogHeader>
                    <DialogTitle>Terms updated</DialogTitle>
                    <DialogDescription>Read the new terms. Use the button below to continue.</DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button>Continue</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
