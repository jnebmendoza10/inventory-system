import { Product } from '../../models/base/Product';

export interface ProductRepository {
    createProduct(product: Partial<Product>): Promise<void>;
    getAllProducts(): Promise<Product[]>;
    getProductById(productId: string): Promise<Product>;
    editProduct(productId: string, product: Partial<Product>): Promise<void>;
    deleteProduct(productId: string): Promise<void>;
}
