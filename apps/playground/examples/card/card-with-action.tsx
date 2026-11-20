import { EllipsisIcon } from 'lucide-react';

import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle, IconButton } from '@rax-ds/ui';

export default function CardWithAction() {
    return (
        <Card className="w-full max-w-sm">
            <CardHeader>
                <CardTitle>Team members</CardTitle>
                <CardDescription>Manage who can access this project.</CardDescription>
                <CardAction>
                    <IconButton label="More actions" variant="ghost" size="sm">
                        <EllipsisIcon />
                    </IconButton>
                </CardAction>
            </CardHeader>
            <CardContent>4 people have access.</CardContent>
        </Card>
    );
}
