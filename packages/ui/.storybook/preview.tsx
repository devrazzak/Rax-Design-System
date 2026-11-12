import type { Preview } from '@storybook/react-vite';
import { withThemeByClassName } from '@storybook/addon-themes';

import './storybook.css';

const preview: Preview = {
    parameters: {
        controls: {
            matchers: { color: /(background|color)$/i, date: /Date$/i },
        },
        // Show accessibility violations in the panel without failing anything yet
        a11y: { test: 'todo' },
    },
    decorators: [
        // Adds a toolbar toggle that puts class="dark" on <html>, same as next-themes
        withThemeByClassName({
            themes: { light: '', dark: 'dark' },
            defaultTheme: 'light',
        }),
    ],
};

export default preview;
