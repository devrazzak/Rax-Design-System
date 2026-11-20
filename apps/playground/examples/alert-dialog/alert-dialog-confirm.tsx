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

export default function AlertDialogConfirm() {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button>Publish changes</Button>
            </AlertDialogTrigger>
            <AlertDialogContent size="sm">
                <AlertDialogHeader>
                    <AlertDialogTitle>Publish your changes?</AlertDialogTitle>
                    <AlertDialogDescription>Everyone with access will see the new version.</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Not yet</AlertDialogCancel>
                    <AlertDialogAction>Publish</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
