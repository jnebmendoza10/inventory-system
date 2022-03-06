import { Product } from '../../models/base/Product';

export interface ProductService {
    newProduct(product: Partial<Product>): Promise<void>;
    retrieveAllProducts(): Promise<Product[]>;
    retrieveProductById(productId: string): Promise<Product>;
    editProduct(productId: string, product: Partial<Product>): Promise<void>;
    removeProduct(productId: string): Promise<void>;
}
