import '@testing-library/jest-dom';

import { toHaveNoViolations } from 'jest-axe';

// Adds expect(...).toHaveNoViolations() for accessibility checks
expect.extend(toHaveNoViolations);
