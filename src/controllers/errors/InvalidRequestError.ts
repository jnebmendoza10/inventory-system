export class InvalidRequestError extends Error {
    private static readonly message = 'Invalid Request';

    constructor() {
        super(InvalidRequestError.message);
        this.stack = new Error().stack;
    }
}
