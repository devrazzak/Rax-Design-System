import { List, ListItem, Row } from '@rax-ds/ui';

export default function ListSize() {
    return (
        <Row gap="xl" align="start" wrap justify="center">
            <List size="xs">
                <ListItem>xs</ListItem>
                <ListItem>xs</ListItem>
            </List>
            <List size="sm">
                <ListItem>sm</ListItem>
                <ListItem>sm</ListItem>
            </List>
            <List size="md">
                <ListItem>md</ListItem>
                <ListItem>md</ListItem>
            </List>
            <List size="lg">
                <ListItem>lg</ListItem>
                <ListItem>lg</ListItem>
            </List>
            <List size="xl">
                <ListItem>xl</ListItem>
                <ListItem>xl</ListItem>
            </List>
        </Row>
    );
}
