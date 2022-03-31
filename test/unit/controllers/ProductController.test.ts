import { NextFunction, request, Request, response, Response } from "express";
import { mock, mockClear, mockReset } from "jest-mock-extended";
import { InvalidRequestError } from "../../../src/controllers/errors/InvalidRequestError";
import { ProductController } from "../../../src/controllers/ProductController"
import { ProductService } from "../../../src/services/base/ProductService";
import { Logger } from "../../../src/utils/Logger";



describe('ProductController tests', () => {
    const mockProductService = mock<ProductService>();
    const mockLogger = mock<Logger>();

    const req: Request = expect.any(request);
    const res: Response = expect.any(response);
    const next: NextFunction = jest.fn();

    let productController : ProductController;

    beforeEach(() => {
        mockReset(mockProductService)
        mockClear(mockProductService)

        mockReset(mockLogger)
        mockClear(mockLogger)

        mockReset(next)
        mockClear(next)

        jest.resetAllMocks();

        productController = new ProductController(mockProductService, mockLogger);
    })

    describe('createProduct', () => {
        it('should successfully create a product', async () => {
          
            req.body = {
                name: 'Safeguard',
                quantity: 2
            };
            res.status = jest.fn().mockReturnThis();
            res.json = jest.fn()

            await productController.createProduct(req, res, next)

            expect(next).toBeCalledTimes(0);
            expect(mockProductService.newProduct).toBeCalledTimes(1);
            expect(mockProductService.newProduct).toBeCalledWith(req.body);
            expect(res.status).toBeCalledTimes(1);
            expect(res.status).toBeCalledWith(201);
            expect(res.json).toBeCalledTimes(1);
            expect(res.json).toBeCalledWith({ message: 'Product successfully created' });

        })

        it('should call next function if the system failed to create a product', async () => {
            req.body = {name: 'idk'};
            const error = new Error();

            mockProductService.newProduct.mockRejectedValueOnce(error);
            
            await productController.createProduct(req, res, next);

           expect(mockLogger.error).toBeCalledTimes(1);
           expect(mockLogger.error).toBeCalledWith('Failed to create a product', error);
           expect(next).toBeCalledTimes(1);
           expect(next).toBeCalledWith(error);

        })
    })
    describe('retrieveAllProducts () - ', () => {
        it('should successfully retrieve all products', async () => {
            res.status = jest.fn().mockReturnThis();
            res.json = jest.fn();
            const dummyProducts = [{
                id: '1', 
                name: 'Safeguard', 
                quantity: 4
           },{
                id: '2', 
                name: 'Bioderm', 
                quantity: 4
           }];

           mockProductService.retrieveAllProducts.mockResolvedValueOnce(dummyProducts);

           await productController.retrieveAllProducts(req, res, next);

           expect(next).toBeCalledTimes(0);
           expect(mockProductService.retrieveAllProducts).toBeCalledTimes(1);
           expect(res.status).toBeCalledTimes(1);
           expect(res.status).toBeCalledWith(200);
           expect(res.json).toBeCalledTimes(1);
           expect(res.json).toBeCalledWith(dummyProducts);
        })

        it('should call the next function if the system failed to retrieve products', async () => {
            const error = new Error();

            mockProductService.retrieveAllProducts.mockRejectedValueOnce(error);

            await productController.retrieveAllProducts(req, res, next);

            expect(mockProductService.retrieveAllProducts).toBeCalledTimes(1);
            expect(mockLogger.error).toBeCalledTimes(1);
            expect(mockLogger.error).toBeCalledWith('Failed to retrieve products', error);
            expect(next).toBeCalledTimes(1);
            expect(next).toBeCalledWith(error);
        })

    })

    describe('retrieveProduct () - ', () => {
        it('should successfully retrieve product by id', async () => {
            res.status = jest.fn().mockReturnThis();
            res.json = jest.fn();
            const dummyProduct = {
                id: '1', 
                name: 'Safeguard', 
                quantity: 4
           };
           req.params = {
               productId : '1'
           }

           mockProductService.retrieveProductById.mockResolvedValueOnce(dummyProduct);

           await productController.retrieveAllProducts(req, res, next);

           expect(next).toBeCalledTimes(0);
           expect(mockProductService.retrieveProductById).toBeCalledTimes(1);
           expect(mockProductService.retrieveProductById).toBeCalledWith(req.params.productId);
           expect(res.status).toBeCalledTimes(1);
           expect(res.status).toBeCalledWith(200);
           expect(res.json).toBeCalledTimes(1);
           expect(res.json).toBeCalledWith(dummyProduct);
        })

        it('should throw an error if the productId input is invalid', async () => {
            const error = new Error();
            req.params = {
                productId: '13123123'
            }

            await productController.retrieveProduct(req, res, next);

            expect(mockLogger.error).toBeCalledTimes(1);
            expect(mockLogger.error).toBeCalledWith('Invalid productId', req.params.productId);
            expect(next).toBeCalledTimes(1);
            expect(next).toBeCalledWith(new InvalidRequestError(), req.params.productId);
            
        })

        it('should call the next function if the system failed to retrieve a product', async () => {
            const error = new Error();
            req.params = {
                productId: '13123123'
            }
            mockProductService.retrieveProductById.mockRejectedValueOnce(error);

            await productController.retrieveProduct(req, res, next);

            expect(mockProductService.retrieveProductById).toBeCalledTimes(1);
            expect(mockProductService.retrieveProductById).toBeCalledWith(req.params.productId)
            expect(mockLogger.error).toBeCalledTimes(1);
            expect(mockLogger.error).toBeCalledWith('Failed to retrieve a product', error);
            expect(next).toBeCalledTimes(1);
            expect(next).toBeCalledWith(error);
        })

    })

    describe('editProduct () - ', () => {
        it('should successfully edit product by id', async () => {
            res.status = jest.fn().mockReturnThis();
            res.json = jest.fn();
            const dummyProduct = {
                name: 'Safeguard', 
                quantity: 4
           };
           req.body = dummyProduct
           req.params = {
               productId : '1'
           }


           await productController.editProduct(req, res, next);

           expect(next).toBeCalledTimes(0);
           expect(mockProductService.editProduct).toBeCalledTimes(1);
           expect(mockProductService.editProduct).toBeCalledWith(req.params.productId, req.body);
           expect(res.status).toBeCalledTimes(1);
           expect(res.status).toBeCalledWith(200);
           expect(res.json).toBeCalledTimes(1);
           expect(res.json).toBeCalledWith({message: 'Product updated successfully'});
        })

        it('should throw an error if the productId input is invalid', async () => {
            const error = new Error();
            req.params = {
                productId: undefined
            }

            await productController.editProduct(req, res, next);

            expect(mockLogger.error).toBeCalledTimes(1);
            expect(mockLogger.error).toBeCalledWith('Invalid productId', req.params.productId);
            expect(next).toBeCalledTimes(1);
            expect(next).toBeCalledWith(new InvalidRequestError(), req.params.productId);
            
        })

        it('should call the next function if the system failed to edit a product', async () => {
            const error = new Error();
            req.params = {
                productId: '13123123'
            }
            const dummyProduct = {
                name: 'Safeguard', 
                quantity: 4
           };
           req.body = dummyProduct
            mockProductService.editProduct.mockRejectedValueOnce(error);

            await productController.editProduct(req, res, next);

            expect(mockProductService.editProduct).toBeCalledTimes(1);
            expect(mockProductService.editProduct).toBeCalledWith(req.params.productId, req.body)
            expect(mockLogger.error).toBeCalledTimes(1);
            expect(mockLogger.error).toBeCalledWith('Failed to edit a product', error);
            expect(next).toBeCalledTimes(1);
            expect(next).toBeCalledWith(error);
        })

    })

    describe('deleteProduct () - ', () => {
        it('should successfully delete product by id', async () => {
            res.status = jest.fn().mockReturnThis();
            res.json = jest.fn();
     
           req.params = {
               productId : '1'
           }
           
           await productController.deleteProduct(req, res, next);

           expect(next).toBeCalledTimes(0);
           expect(mockProductService.removeProduct).toBeCalledTimes(1);
           expect(mockProductService.removeProduct).toBeCalledWith(req.params.productId);
           expect(res.status).toBeCalledTimes(1);
           expect(res.status).toBeCalledWith(200);
           expect(res.json).toBeCalledTimes(1);
           expect(res.json).toBeCalledWith({message: 'Product deleted successfully'});
        })

        it('should throw an error if the productId input is invalid', async () => {
            const error = new Error();
            req.params = {
                productId: '13123123'
            }

            await productController.deleteProduct(req, res, next);

            expect(mockLogger.error).toBeCalledTimes(1);
            expect(mockLogger.error).toBeCalledWith('Invalid productId', req.params.productId);
            expect(next).toBeCalledTimes(1);
            expect(next).toBeCalledWith(new InvalidRequestError(), req.params.productId);
            
        })

        it('should call the next function if the system failed to delete a product', async () => {
            const error = new Error();
            req.params = {
                productId: '13123123'
            }
         
            mockProductService.removeProduct.mockRejectedValueOnce(error);

            await productController.deleteProduct(req, res, next);

            expect(mockProductService.removeProduct).toBeCalledTimes(1);
            expect(mockProductService.removeProduct).toBeCalledWith(req.params.productId)
            expect(mockLogger.error).toBeCalledTimes(1);
            expect(mockLogger.error).toBeCalledWith('Failed to delete a product', error);
            expect(next).toBeCalledTimes(1);
            expect(next).toBeCalledWith(error);
        })

    })

    
})