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
    Row,
} from '@rax-ds/ui';

export default function AlertDialogSizes() {
    return (
        <Row gap="sm" wrap justify="center">
            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <Button variant="outline">Small</Button>
                </AlertDialogTrigger>
                <AlertDialogContent size="sm">
                    <AlertDialogHeader>
                        <AlertDialogTitle>Small confirmation</AlertDialogTitle>
                        <AlertDialogDescription>The width stops at the small size.</AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction>Continue</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <Button variant="outline">Medium</Button>
                </AlertDialogTrigger>
                <AlertDialogContent size="md">
                    <AlertDialogHeader>
                        <AlertDialogTitle>Medium confirmation</AlertDialogTitle>
                        <AlertDialogDescription>
                            The width stops at the medium size, the default.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction>Continue</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <Button variant="outline">Large</Button>
                </AlertDialogTrigger>
                <AlertDialogContent size="lg">
                    <AlertDialogHeader>
                        <AlertDialogTitle>Large confirmation</AlertDialogTitle>
                        <AlertDialogDescription>The width stops at the large size.</AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction>Continue</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <Button variant="outline">Extra large</Button>
                </AlertDialogTrigger>
                <AlertDialogContent size="xl">
                    <AlertDialogHeader>
                        <AlertDialogTitle>Extra large confirmation</AlertDialogTitle>
                        <AlertDialogDescription>The width stops at the extra large size.</AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction>Continue</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </Row>
    );
}
