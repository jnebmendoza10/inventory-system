export class PasswordsNotMatchError extends Error {
    private static readonly message = `Passwords entered do not match`;

    constructor() {
        super(PasswordsNotMatchError.message);
        this.stack = new Error().stack;
    }
}
