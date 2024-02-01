


import { writeEmail12 } from './writeEmail12.ts';

describe('writeEmail12', () => {
    it('should be a function', () => {
        expect(typeof writeEmail12).toBe('function');
    });

    it('should return a promise', () => {
        const result = writeEmail12();
        expect(result).toBeInstanceOf(Promise);
    });

    describe('when resolving the promise', () => {
        let email: Promise<Email>;

        beforeEach(() => {
            email = writeEmail12();
        });

        it('should resolve with an email', () => {
            email.then((result) => {
                expect(result).toBeInstanceOf(Email);
            });
        });
    });
});
