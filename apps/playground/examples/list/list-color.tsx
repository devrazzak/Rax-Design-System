import { List, ListItem, Row, Section } from '@rax-ds/ui';

export default function ListColor() {
    return (
        <Row gap="xl" align="start" wrap justify="center">
            <List color="foreground">
                <ListItem>foreground</ListItem>
                <ListItem>foreground</ListItem>
            </List>
            <List color="muted">
                <ListItem>muted</ListItem>
                <ListItem>muted</ListItem>
            </List>
            <List color="primary">
                <ListItem>primary</ListItem>
                <ListItem>primary</ListItem>
            </List>
            <List color="secondary">
                <ListItem>secondary</ListItem>
                <ListItem>secondary</ListItem>
            </List>
            <Section tone="primary" className="rounded-md p-4">
                <List color="white">
                    <ListItem>white</ListItem>
                    <ListItem>white</ListItem>
                </List>
            </Section>
        </Row>
    );
}
