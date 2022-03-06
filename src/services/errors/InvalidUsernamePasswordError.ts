export class InvalidUsernamePasswordError extends Error {
    private static readonly message = `Invalid username or password`;

    constructor() {
        super(InvalidUsernamePasswordError.message);
        this.stack = new Error().stack;
    }
}
