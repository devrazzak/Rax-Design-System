import { Button, Tooltip, TooltipContent, TooltipTrigger } from '@rax-ds/ui';

export default function TooltipDemo() {
    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <Button variant="outline">Hover or focus me</Button>
            </TooltipTrigger>
            <TooltipContent>Add to library</TooltipContent>
        </Tooltip>
    );
}
