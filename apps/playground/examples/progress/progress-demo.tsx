import { Progress } from '@rax-ds/ui';

export default function ProgressDemo() {
    return <Progress value={60} aria-label="Upload progress" className="w-full max-w-sm" />;
}
