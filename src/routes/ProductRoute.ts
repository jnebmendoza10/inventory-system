import { Application } from 'express';
import { ProductController } from '../controllers/ProductController';
import { checkRoleAdmin } from '../middlewares/checkRole';
import { validateJwt } from '../middlewares/validateJwt';
import { validateSchema } from '../middlewares/validateSchema';
import { Route } from './Route';

export class ProductRoute implements Route {
    constructor(private readonly productController: ProductController) {}

    mountRoute(application: Application): void {
        application.post(
            'product/create',
            [validateJwt, checkRoleAdmin, validateSchema('productValidator')],
            this.productController.createProduct,
        );
        application.get('/products', [validateJwt, checkRoleAdmin], this.productController.retriveAllProducts);
        application.get('/product/productId', [validateJwt, checkRoleAdmin], this.productController.retriveProduct);
        application.patch(
            '/product/edit/productId',
            [validateJwt, checkRoleAdmin, validateSchema('productValidator')],
            this.productController.editProduct,
        );
        application.delete(
            '/product/delete/productId',
            [validateJwt, checkRoleAdmin],
            this.productController.deleteProduct,
        );
    }
}
