import type { DocSection } from '@/types/docs';

/**
 * Single source of truth for every docs page.
 * Sidebar, search, prev/next links, metadata and static params are all built from this list.
 * Each item needs a matching MDX file: `content/docs/<slug>.mdx` (`index.mdx` for the empty slug).
 */
export const docsNav: readonly DocSection[] = [
    {
        title: 'Getting Started',
        items: [
            {
                slug: '',
                title: 'Introduction',
                description: 'What the design system is, what it includes and how it is built.',
            },
            {
                slug: 'installation',
                title: 'Installation',
                description: 'Install the packages and set up Tailwind CSS and the styles.',
            },
            {
                slug: 'theming',
                title: 'Theming',
                description: 'Override design tokens to apply your own brand.',
            },
            {
                slug: 'dark-mode',
                title: 'Dark Mode',
                description: 'Switch themes with a class or attribute, without a flash on load.',
            },
        ],
    },
    {
        title: 'Foundations',
        items: [
            {
                slug: 'foundations/colors',
                title: 'Colors',
                description: 'Semantic color tokens for surfaces, text, brand and status, in light and dark.',
            },
            {
                slug: 'foundations/typography',
                title: 'Typography',
                description: 'Font families and the Heading and Text size scales.',
            },
            {
                slug: 'foundations/radius',
                title: 'Radius',
                description: 'The corner radius scale used by every component.',
            },
        ],
    },
    {
        title: 'Layout',
        items: [
            {
                slug: 'components/container',
                title: 'Container',
                description: 'A centered, responsive page width with side padding.',
            },
            {
                slug: 'components/section',
                title: 'Section',
                description: 'A page section with vertical spacing, a background and a semantic tag.',
            },
            {
                slug: 'components/stack',
                title: 'Stack',
                description: 'Lays children out in a column with a consistent gap.',
            },
            {
                slug: 'components/row',
                title: 'Row',
                description: 'Lays children out in a line with gap, alignment and wrapping.',
            },
            {
                slug: 'components/grid',
                title: 'Grid',
                description: 'A column grid with responsive column counts and item spans.',
            },
            {
                slug: 'components/separator',
                title: 'Separator',
                description: 'A thin line that divides content, horizontal or vertical.',
            },
            {
                slug: 'components/scroll-area',
                title: 'ScrollArea',
                description: 'A scrollable region with a styled scrollbar.',
            },
        ],
    },
    {
        title: 'Typography',
        items: [
            {
                slug: 'components/heading',
                title: 'Heading',
                description: 'Page and section titles with a tag, size, weight and color.',
            },
            {
                slug: 'components/text',
                title: 'Text',
                description: 'Body text with size, weight, color, alignment and letter spacing.',
            },
            {
                slug: 'components/list',
                title: 'List',
                description: 'Ordered and unordered lists with markers, gaps and optional icons.',
            },
        ],
    },
    {
        title: 'Inputs',
        items: [
            {
                slug: 'components/button',
                title: 'Button',
                description: 'Triggers an action. Comes with variants, sizes, icons and a loading state.',
            },
            {
                slug: 'components/icon-button',
                title: 'IconButton',
                description: 'A button that shows only an icon, with a required label and a tooltip.',
            },
            {
                slug: 'components/input',
                title: 'Input',
                description: 'A single-line text field in four sizes, with an invalid state.',
            },
            {
                slug: 'components/textarea',
                title: 'Textarea',
                description: 'A multi-line text field that grows with its content.',
            },
            {
                slug: 'components/select',
                title: 'Select',
                description: 'A dropdown to choose one value, built from composable parts.',
            },
            {
                slug: 'components/option-select',
                title: 'OptionSelect',
                description: 'A Select built from an array of options.',
            },
            {
                slug: 'components/checkbox',
                title: 'Checkbox',
                description: 'A box that is checked, unchecked or indeterminate.',
            },
            {
                slug: 'components/radio-group',
                title: 'RadioGroup',
                description: 'Choose one option from a small set.',
            },
            {
                slug: 'components/switch',
                title: 'Switch',
                description: 'A control that turns a setting on or off.',
            },
            {
                slug: 'components/toggle',
                title: 'Toggle',
                description: 'A button that stays pressed or unpressed.',
            },
            {
                slug: 'components/toggle-group',
                title: 'ToggleGroup',
                description: 'A set of toggles where one or several can be pressed.',
            },
            {
                slug: 'components/input-otp',
                title: 'InputOTP',
                description: 'A one-time code split into separate slots.',
            },
            {
                slug: 'components/input-group',
                title: 'InputGroup',
                description: 'An input with icons, text or buttons beside it.',
            },
            {
                slug: 'components/label',
                title: 'Label',
                description: 'A label for a form control.',
            },
            {
                slug: 'components/field',
                title: 'Field',
                description: 'A control with its label, hint and error message.',
            },
        ],
    },
    {
        title: 'Feedback',
        items: [
            {
                slug: 'components/alert',
                title: 'Alert',
                description: 'An inline message in info, warning or error style, with an optional action.',
            },
            {
                slug: 'components/badge',
                title: 'Badge',
                description: 'A short status label in several variants and sizes.',
            },
            {
                slug: 'components/progress',
                title: 'Progress',
                description: 'Shows how far a task has come.',
            },
            {
                slug: 'components/skeleton',
                title: 'Skeleton',
                description: 'A placeholder shape shown while content loads.',
            },
            {
                slug: 'components/spinner',
                title: 'Spinner',
                description: 'A loading indicator in several sizes and colors.',
            },
        ],
    },
    {
        title: 'Overlay',
        items: [
            {
                slug: 'components/dialog',
                title: 'Dialog',
                description: 'A modal window for content or a form, in five widths.',
            },
            {
                slug: 'components/alert-dialog',
                title: 'AlertDialog',
                description: 'A modal window that interrupts to ask for a decision.',
            },
            {
                slug: 'components/drawer',
                title: 'Drawer',
                description: 'A panel that slides in from any edge of the screen.',
            },
            {
                slug: 'components/popover',
                title: 'Popover',
                description: 'A floating panel opened from a button.',
            },
            {
                slug: 'components/tooltip',
                title: 'Tooltip',
                description: 'A short hint shown on hover or focus.',
            },
            {
                slug: 'components/dropdown-menu',
                title: 'DropdownMenu',
                description: 'A menu of actions opened from a button.',
            },
        ],
    },
    {
        title: 'Data display',
        items: [
            {
                slug: 'components/avatar',
                title: 'Avatar',
                description: 'The picture of a person, with a fallback, a status badge and a group layout.',
            },
            {
                slug: 'components/card',
                title: 'Card',
                description: 'A bordered surface that groups related content.',
            },
            {
                slug: 'components/table',
                title: 'Table',
                description: 'Rows and columns of data in a scrollable box.',
            },
            {
                slug: 'components/accordion',
                title: 'Accordion',
                description: 'Sections that expand and collapse.',
            },
            {
                slug: 'components/tabs',
                title: 'Tabs',
                description: 'Switch between views in the same place.',
            },
        ],
    },
    {
        title: 'Navigation',
        items: [
            {
                slug: 'components/breadcrumb',
                title: 'Breadcrumb',
                description: 'The path to the current page.',
            },
        ],
    },
];
