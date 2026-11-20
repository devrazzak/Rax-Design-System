import { List, ListItem, Row } from '@rax-ds/ui';

export default function ListGap() {
    return (
        <Row gap="xl" align="start" wrap justify="center">
            <List gap="none">
                <ListItem>none</ListItem>
                <ListItem>none</ListItem>
                <ListItem>none</ListItem>
            </List>
            <List gap="xs">
                <ListItem>xs</ListItem>
                <ListItem>xs</ListItem>
                <ListItem>xs</ListItem>
            </List>
            <List gap="sm">
                <ListItem>sm, the default</ListItem>
                <ListItem>sm</ListItem>
                <ListItem>sm</ListItem>
            </List>
            <List gap="md">
                <ListItem>md</ListItem>
                <ListItem>md</ListItem>
                <ListItem>md</ListItem>
            </List>
            <List gap="lg">
                <ListItem>lg</ListItem>
                <ListItem>lg</ListItem>
                <ListItem>lg</ListItem>
            </List>
            <List gap="xl">
                <ListItem>xl</ListItem>
                <ListItem>xl</ListItem>
                <ListItem>xl</ListItem>
            </List>
        </Row>
    );
}
