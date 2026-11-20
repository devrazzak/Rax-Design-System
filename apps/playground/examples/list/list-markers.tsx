import { List, ListItem, Row } from '@rax-ds/ui';

export default function ListMarkers() {
    return (
        <Row gap="xl" align="start" wrap justify="center">
            <List marker="disc">
                <ListItem>disc</ListItem>
                <ListItem>disc</ListItem>
            </List>
            <List marker="decimal">
                <ListItem>decimal</ListItem>
                <ListItem>decimal</ListItem>
            </List>
            <List marker="none">
                <ListItem>none</ListItem>
                <ListItem>none</ListItem>
            </List>
        </Row>
    );
}
