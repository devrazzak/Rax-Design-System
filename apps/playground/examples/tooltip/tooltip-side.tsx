import { Button, Row, Tooltip, TooltipContent, TooltipTrigger } from '@rax-ds/ui';

export default function TooltipSide() {
    return (
        <Row gap="sm" wrap justify="center">
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button variant="outline">Top</Button>
                </TooltipTrigger>
                <TooltipContent side="top">Above the trigger</TooltipContent>
            </Tooltip>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button variant="outline">Right</Button>
                </TooltipTrigger>
                <TooltipContent side="right">Right of the trigger</TooltipContent>
            </Tooltip>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button variant="outline">Bottom</Button>
                </TooltipTrigger>
                <TooltipContent side="bottom">Below the trigger</TooltipContent>
            </Tooltip>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button variant="outline">Left</Button>
                </TooltipTrigger>
                <TooltipContent side="left">Left of the trigger</TooltipContent>
            </Tooltip>
        </Row>
    );
}
