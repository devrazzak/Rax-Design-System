import { codeToHtml } from 'shiki';

/**
 * Turns code into highlighted HTML on the server. No highlighter code reaches the browser.
 * Cached, so each snippet is highlighted once per build.
 * Both themes are written as CSS variables; globals.css picks one by the `dark` class.
 */
export async function highlight(code: string, lang: string): Promise<string> {
    'use cache';

    return codeToHtml(code, {
        lang,
        themes: { light: 'github-light', dark: 'github-dark' },
        defaultColor: false,
    });
}
