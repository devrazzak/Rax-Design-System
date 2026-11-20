import { CheckIcon } from 'lucide-react';

import { List, ListItem } from '@rax-ds/ui';

export default function ListWithIcon() {
    return (
        <List marker="none">
            <ListItem icon={<CheckIcon />}>Unlimited projects</ListItem>
            <ListItem icon={<CheckIcon />}>Priority support</ListItem>
            <ListItem icon={<CheckIcon />}>Export to CSV</ListItem>
        </List>
    );
}
