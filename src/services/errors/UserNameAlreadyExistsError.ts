export class UserNameAlreadyExistsError extends Error {
    private static readonly message = `The username you entered already exists.`;

    constructor() {
        super(UserNameAlreadyExistsError.message);
        this.stack = new Error().stack;
    }
}
