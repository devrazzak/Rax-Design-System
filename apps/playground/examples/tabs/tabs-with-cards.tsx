import {
    Button,
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
    Field,
    FieldLabel,
    Input,
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from '@rax-ds/ui';

export default function TabsWithCards() {
    return (
        <Tabs defaultValue="account" className="w-full max-w-sm">
            <TabsList>
                <TabsTrigger value="account">Account</TabsTrigger>
                <TabsTrigger value="password">Password</TabsTrigger>
            </TabsList>
            <TabsContent value="account">
                <Card>
                    <CardHeader>
                        <CardTitle>Account</CardTitle>
                        <CardDescription>Change your account details.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Field>
                            <FieldLabel htmlFor="tabs-with-cards-name">Name</FieldLabel>
                            <Input id="tabs-with-cards-name" defaultValue="Alex Morgan" />
                        </Field>
                    </CardContent>
                    <CardFooter>
                        <Button>Save</Button>
                    </CardFooter>
                </Card>
            </TabsContent>
            <TabsContent value="password">
                <Card>
                    <CardHeader>
                        <CardTitle>Password</CardTitle>
                        <CardDescription>Choose a new password.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Field>
                            <FieldLabel htmlFor="tabs-with-cards-password">New password</FieldLabel>
                            <Input id="tabs-with-cards-password" type="password" />
                        </Field>
                    </CardContent>
                    <CardFooter>
                        <Button>Update</Button>
                    </CardFooter>
                </Card>
            </TabsContent>
        </Tabs>
    );
}
