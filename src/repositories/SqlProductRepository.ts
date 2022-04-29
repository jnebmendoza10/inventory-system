import { Product } from '../models/base/Product';
import { ProductModel } from '../models/sequelize/ProductSequelize';
import { ProductRepository } from './base/ProductRepository';
import { ProductNotFoundError } from './ProductNotFoundError';

export class SqlProductRepository implements ProductRepository {
    async createProduct(product: Partial<Product>): Promise<void> {
        await ProductModel.create(product);
    }
    async getAllProducts(): Promise<Product[]> {
        const products = await ProductModel.findAll();
        return products;
    }
    async getProductById(productId: string): Promise<Product> {
        const product = await ProductModel.findOne({ where: { id: productId } });
        if (product === null) {
            throw new ProductNotFoundError();
        }
        return product;
    }
    async editProduct(productId: string, product: Partial<Product>): Promise<void> {
        await ProductModel.update(product, { where: { id: productId } });
    }
    async deleteProduct(productId: string): Promise<void> {
        await ProductModel.destroy({ where: { id: productId } });
    }
}
