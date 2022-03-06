export class TooManyRequestsError extends Error {
    private static readonly message = 'Maximum request has been reached';

    constructor() {
        super(TooManyRequestsError.message);
        this.stack = new Error().stack;
    }
}
