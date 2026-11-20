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

export default function DialogDemo() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">View order</Button>
            </DialogTrigger>
            <DialogContent size="sm">
                <DialogHeader>
                    <DialogTitle>Order 1042</DialogTitle>
                    <DialogDescription>Placed on Monday. Two items, shipped by express delivery.</DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline">Close</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
