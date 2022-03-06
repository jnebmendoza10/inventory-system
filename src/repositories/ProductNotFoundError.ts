export class ProductNotFoundError extends Error {
    private static readonly message = `Product not found`;

    constructor() {
        super(ProductNotFoundError.message);
        this.stack = new Error().stack;
    }
}
