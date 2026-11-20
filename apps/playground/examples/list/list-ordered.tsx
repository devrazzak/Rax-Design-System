import { List, ListItem } from '@rax-ds/ui';

export default function ListOrdered() {
    return (
        <List as="ol">
            <ListItem>Create an account</ListItem>
            <ListItem>Verify your email</ListItem>
            <ListItem>Place your first order</ListItem>
        </List>
    );
}
