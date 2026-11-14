import * as publicApi from '@/index';

/** Guards the public API: removing an export is a breaking change for everyone who installs the package. */
describe('public API', () => {
    it.each(['Button', 'buttonVariants', 'Spinner', 'spinnerVariants', 'cn'])('exports %s', name => {
        expect(publicApi).toHaveProperty(name);
    });
});
