import { Button, Row, Tooltip, TooltipContent, TooltipTrigger } from '@rax-ds/ui';

export default function TooltipVariants() {
    return (
        <Row gap="sm" wrap justify="center">
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button variant="outline">Default</Button>
                </TooltipTrigger>
                <TooltipContent variant="default">Default tooltip</TooltipContent>
            </Tooltip>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button variant="outline">Primary</Button>
                </TooltipTrigger>
                <TooltipContent variant="primary">Primary tooltip</TooltipContent>
            </Tooltip>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button variant="outline">Secondary</Button>
                </TooltipTrigger>
                <TooltipContent variant="secondary">Secondary tooltip</TooltipContent>
            </Tooltip>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button variant="outline">Destructive</Button>
                </TooltipTrigger>
                <TooltipContent variant="destructive">Destructive tooltip</TooltipContent>
            </Tooltip>
        </Row>
    );
}
