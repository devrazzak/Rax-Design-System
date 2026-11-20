import { Button, Row, Tooltip, TooltipContent, TooltipTrigger } from '@rax-ds/ui';

export default function TooltipDelay() {
    return (
        <Row gap="sm" wrap justify="center">
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button variant="outline">No delay</Button>
                </TooltipTrigger>
                <TooltipContent>Shows right away</TooltipContent>
            </Tooltip>
            <Tooltip delayDuration={700}>
                <TooltipTrigger asChild>
                    <Button variant="outline">700 ms delay</Button>
                </TooltipTrigger>
                <TooltipContent>Shows after 700 ms</TooltipContent>
            </Tooltip>
        </Row>
    );
}
