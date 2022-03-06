import { Product } from '../models/base/Product';
import { ProductRepository } from '../repositories/base/ProductRepository';
import { ProductService } from './base/ProductService';

export class DefaultProductService implements ProductService {
    constructor(private readonly productRepository: ProductRepository) {}

    async newProduct(product: Partial<Product>): Promise<void> {
        await this.productRepository.createProduct(product);
    }
    async retrieveAllProducts(): Promise<Product[]> {
        const products = await this.productRepository.getAllProducts();
        return products;
    }
    async retrieveProductById(productId: string): Promise<Product> {
        const product = this.productRepository.getProductById(productId);
        return product;
    }
    async editProduct(productId: string, product: Partial<Product>): Promise<void> {
        await this.productRepository.editProduct(productId, product);
    }
    async removeProduct(productId: string): Promise<void> {
        await this.productRepository.deleteProduct(productId);
    }
}
