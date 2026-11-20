import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
    Button,
} from '@rax-ds/ui';

export default function AlertDialogDemo() {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant="destructive">Delete order</Button>
            </AlertDialogTrigger>
            <AlertDialogContent size="sm">
                <AlertDialogHeader>
                    <AlertDialogTitle>Delete order 1042?</AlertDialogTitle>
                    <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction variant="destructive">Delete</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
