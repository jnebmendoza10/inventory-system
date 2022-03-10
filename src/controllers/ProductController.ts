import { NextFunction, Request, Response } from 'express';
import { Product } from '../models/base/Product';
import { ProductService } from '../services/base/ProductService';
import { InvalidRequestError } from './errors/InvalidRequestError';

export class ProductController {
    constructor(private readonly productService: ProductService) {}

    createProduct = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { productName, quantity } = req.body;
            const product: Omit<Product, 'id'> = {
                name: productName,
                quantity: parseInt(quantity),
            };
            await this.productService.newProduct(product);

            res.status(201).json({ message: 'Product successfully created' });
        } catch (error) {
            next(error);
        }
    };

    retriveAllProducts = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const products = await this.productService.retrieveAllProducts();

            res.status(200).json(products);
        } catch (error) {
            next(error);
        }
    };

    retriveProduct = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { productId } = req.params;
            if (productId === undefined) {
                next(new InvalidRequestError());
            }

            const product = await this.productService.retrieveProductById(productId);

            res.status(200).json(product);
        } catch (error) {
            next(error);
        }
    };

    editProduct = async (req: Request, res: Response, next: NextFunction) => {
        try {
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
        } catch (error) {
            next(error);
        }
    };

    deleteProduct = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { productId } = req.params;
            if (productId === undefined) {
                next(new InvalidRequestError());
            }

            await this.productService.removeProduct(productId);

            res.status(200).json({ message: 'Product deleted successfully' });
        } catch (error) {
            next(error);
        }
    };
}
