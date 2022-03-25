import { NextFunction, Request, Response } from 'express';
import { Product } from '../models/base/Product';
import { ProductService } from '../services/base/ProductService';
import { Logger } from '../utils/Logger';
import { InvalidRequestError } from './errors/InvalidRequestError';

export class ProductController {
    constructor(private readonly productService: ProductService, private readonly logger: Logger) {}

    createProduct = async (req: Request, res: Response, next: NextFunction) => {
        try {
            this.logger.info(`Incoming ${req.method} request`, req.body);

            const { productName, quantity } = req.body;
            const product: Omit<Product, 'id'> = {
                name: productName,
                quantity: parseInt(quantity),
            };
            await this.productService.newProduct(product);

            res.status(201).json({ message: 'Product successfully created' });
        } catch (error: any) {
            this.logger.error('Failed to create a product', error);
            next(error);
        }
    };

    retrieveAllProducts = async (req: Request, res: Response, next: NextFunction) => {
        try {
            this.logger.info(`Incoming ${req.method} request`);
            const products = await this.productService.retrieveAllProducts();

            res.status(200).json(products);
        } catch (error: any) {
            this.logger.error('Failed to retrieve products', error);
            next(error);
        }
    };

    retrieveProduct = async (req: Request, res: Response, next: NextFunction) => {
        try {
            this.logger.info(`Incoming ${req.method} request`);
            const { productId } = req.params;
            if (productId === undefined) {
                next(new InvalidRequestError());
            }

            const product = await this.productService.retrieveProductById(productId);

            res.status(200).json(product);
        } catch (error: any) {
            this.logger.error('Failed to retrieve a product', error);
            next(error);
        }
    };

    editProduct = async (req: Request, res: Response, next: NextFunction) => {
        try {
            this.logger.info(`Incoming ${req.method} request`, req.body);
            const { productId } = req.params;
            if (productId === undefined) {
                next(new InvalidRequestError());
            }
            const { productName, quantity } = req.body;
            const product: Omit<Product, 'id'> = {
                name: productName,
                quantity: parseInt(quantity),
            };

            await this.productService.editProduct(productId, product);

            res.status(200).json({ message: 'Product updated successfully' });
        } catch (error: any) {
            this.logger.error('Failed to edit a product', error);
            next(error);
        }
    };

    deleteProduct = async (req: Request, res: Response, next: NextFunction) => {
        try {
            this.logger.info(`Incoming ${req.method} request`);
            const { productId } = req.params;
            if (productId === undefined) {
                next(new InvalidRequestError());
            }

            await this.productService.removeProduct(productId);

            res.status(200).json({ message: 'Product deleted successfully' });
        } catch (error: any) {
            this.logger.error('Failed to delete a product', error);
            next(error);
        }
    };
}
