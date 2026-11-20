import {
    Button,
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
    Field,
    FieldGroup,
    FieldLabel,
    Input,
} from '@rax-ds/ui';

export default function CardForm() {
    return (
        <Card className="w-full max-w-sm">
            <CardHeader>
                <CardTitle>Sign in</CardTitle>
                <CardDescription>Enter your email and password.</CardDescription>
            </CardHeader>
            <CardContent>
                <FieldGroup>
                    <Field>
                        <FieldLabel htmlFor="card-form-email">Email</FieldLabel>
                        <Input id="card-form-email" type="email" placeholder="name@example.com" />
                    </Field>
                    <Field>
                        <FieldLabel htmlFor="card-form-password">Password</FieldLabel>
                        <Input id="card-form-password" type="password" />
                    </Field>
                </FieldGroup>
            </CardContent>
            <CardFooter>
                <Button type="submit" className="w-full">
                    Sign in
                </Button>
            </CardFooter>
        </Card>
    );
}
