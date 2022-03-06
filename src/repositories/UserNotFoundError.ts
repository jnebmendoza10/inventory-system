export class UserNotFoundError extends Error {
    private static readonly message = `User not found`;

    constructor() {
        super(UserNotFoundError.message);
        this.stack = new Error().stack;
    }
}
