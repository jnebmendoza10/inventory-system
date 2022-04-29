import { ProductModel } from "../../../src/models/sequelize/ProductSequelize";
import { ProductNotFoundError } from "../../../src/repositories/ProductNotFoundError";
import { SqlProductRepository } from "../../../src/repositories/SqlProductRepository"



describe('SqlProductRepository tests', () => {

    let productRepository: SqlProductRepository;
    beforeEach(() => {
        productRepository = new SqlProductRepository;
    })

    describe('createProduct () - ', () => {
        it('should successfully create a product', async () => {
            ProductModel.create = jest.fn();
            const mockedProduct = {
                name: 'Safeguard',
                quantity: 2
            }

            await productRepository.createProduct(mockedProduct);

            expect(ProductModel.create).toBeCalledTimes(1);
            expect(ProductModel.create).toBeCalledWith(mockedProduct);
        })
    })

    describe('getAllProducts () - ', () => {
        it('should successfully retrieve all products', async () => {

            const mockedProducts = [{
                id: '1',
                name: 'Safeguard',
                quantity: 2
            },
            {
                id:'2',
                name: 'Bioderm',
                quantity: 3
            }]

            ProductModel.findAll = jest.fn().mockResolvedValueOnce(mockedProducts);
           
            const products = await productRepository.getAllProducts();

            expect(products).toEqual(mockedProducts);
            expect(ProductModel.findAll).toBeCalledTimes(1);

        })
    })

    describe('getProductById () - ', () => {
        it('should successfully retrieve a product by id', async () => {

            const mockedProduct = {
                id: '1',
                name: 'Safeguard',
                quantity: 2
            }

            ProductModel.findOne = jest.fn().mockResolvedValueOnce(mockedProduct);
           
            const product = await productRepository.getProductById(mockedProduct.id);

            expect(product).toEqual(mockedProduct);
            expect(ProductModel.findOne).toBeCalledTimes(1);
            expect(ProductModel.findOne).toBeCalledWith({ where: { id: mockedProduct.id } });

        })

        it('should return ProductNotFoundError if product is not found', async () => {
            const id = '2';

            ProductModel.findOne = jest.fn().mockResolvedValueOnce(null);

            await expect(productRepository.getProductById(id)).rejects.toThrowError(ProductNotFoundError);

        })
    })

    describe('editProduct () - ', () => {
        it('should successfully edit a product by id', async () => {
            const id = '1';
            const mockedProduct = {
                name: 'Safeguard',
                quantity: 2
            }

            ProductModel.update = jest.fn();
           
            const products = await productRepository.editProduct(id, mockedProduct);

            expect(ProductModel.update).toBeCalledTimes(1);
            expect(ProductModel.update).toBeCalledWith(mockedProduct, { where: { id: id } });

        })
    })

    describe('deleteProduct () - ', () => {
        it('should successfully delete a product by id', async () => {
            const id = '1';

            ProductModel.destroy = jest.fn();
           
            const products = await productRepository.deleteProduct(id);

            expect(ProductModel.destroy).toBeCalledTimes(1);
            expect(ProductModel.destroy).toBeCalledWith({ where: { id: id } });
            
        })
    })

})