export class NoContentError extends Error {
    private static readonly message = 'No content';

    constructor() {
        super(NoContentError.message);
        this.stack = new Error().stack;
    }
}
