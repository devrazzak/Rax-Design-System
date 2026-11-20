import { Button, Row, Tooltip, TooltipContent, TooltipTrigger } from '@rax-ds/ui';

export default function TooltipSizes() {
    return (
        <Row gap="sm" wrap justify="center">
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button variant="outline">Small</Button>
                </TooltipTrigger>
                <TooltipContent size="sm">Small tooltip</TooltipContent>
            </Tooltip>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button variant="outline">Medium</Button>
                </TooltipTrigger>
                <TooltipContent size="md">Medium tooltip</TooltipContent>
            </Tooltip>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button variant="outline">Large</Button>
                </TooltipTrigger>
                <TooltipContent size="lg">Large tooltip</TooltipContent>
            </Tooltip>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button variant="outline">Extra large</Button>
                </TooltipTrigger>
                <TooltipContent size="xl">Extra large tooltip</TooltipContent>
            </Tooltip>
        </Row>
    );
}
