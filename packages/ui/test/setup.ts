import '@testing-library/jest-dom';

import { toHaveNoViolations } from 'jest-axe';

// Adds expect(...).toHaveNoViolations() for accessibility checks
expect.extend(toHaveNoViolations);

// jsdom does not implement these browser APIs, and Radix Select calls them when it opens
Element.prototype.hasPointerCapture = jest.fn(() => false);
Element.prototype.setPointerCapture = jest.fn();
Element.prototype.releasePointerCapture = jest.fn();
Element.prototype.scrollIntoView = jest.fn();

global.ResizeObserver = class {
    observe = jest.fn();
    unobserve = jest.fn();
    disconnect = jest.fn();
};
