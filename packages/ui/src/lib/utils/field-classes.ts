/**
 * Look shared by every form field (Input, Select trigger, ...), so all fields stay visually identical.
 * Height and padding are not here, each component sets its own.
 */
export const fieldClasses =
    'w-full min-w-0 rounded-md border border-input bg-transparent transition-colors outline-none placeholder:text-muted-foreground not-aria-invalid:focus-visible:border-ring disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive';
