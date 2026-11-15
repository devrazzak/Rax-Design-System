/**
 * Look shared by every form field (Input, Select trigger, ...), so all fields stay visually identical.
 * Height and padding are not here, each component sets its own.
 */
export const fieldClasses =
    'rounded-md border border-input bg-transparent transition-colors outline-none placeholder:text-muted-foreground focus-visible:border-primary disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20';
