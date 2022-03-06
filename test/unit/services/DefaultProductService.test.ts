import { mock, mockClear } from "jest-mock-extended"
import { ProductRepository } from "../../../src/repositories/base/ProductRepository"
import { DefaultProductService } from "../../../src/services/DefaultProductService";


describe('DefaultProductService tests', () => {
    const mockedProductRepository = mock<ProductRepository>();
    let defaultProductService : DefaultProductService;

    beforeEach(() => {
        mockClear(mockedProductRepository);
        defaultProductService = new DefaultProductService(mockedProductRepository);
    })

    describe('newProduct () -', () => {
        it('should successfully create a new product', async () => {
            const dummyProduct = {
                id: '1',
                name: 'Safeguard',
                quantity: 3
            };

            await defaultProductService.newProduct(dummyProduct);

            expect(mockedProductRepository.createProduct).toBeCalledTimes(1);
            expect(mockedProductRepository.createProduct).toBeCalledWith(dummyProduct);
        })
    })

    describe('retrieveAllProducts () -', () => {
        it('should successfully retrieve all products', async () => {
            const dummyProducts = [{
                id: '1', 
                name: 'Safeguard',
                quantity: 3 
           },{
                id: '2', 
                name: 'Downy',
                quantity: 4 
           }];

           mockedProductRepository.getAllProducts.mockResolvedValueOnce(dummyProducts);
           const products = await defaultProductService.retrieveAllProducts();

           expect(products).toBe(dummyProducts);
           expect(mockedProductRepository.getAllProducts).toBeCalledTimes(1);
        })
    })

    describe('retrieveProductById () -', () => {
        it('should successfully retrieve a product based on its id', async () => {
            const id = '1';
            const dummyProduct = {
                id: '1',
                name: 'Safeguard',
                quantity: 3
            };

           mockedProductRepository.getProductById.mockResolvedValueOnce(dummyProduct);
           const product = await defaultProductService.retrieveProductById(id);

           expect(product).toBe(dummyProduct);
           expect(mockedProductRepository.getProductById).toBeCalledTimes(1);
           expect(mockedProductRepository.getProductById).toBeCalledWith(id);
        })
    })

    describe('editProduct () -', () => {
        it('should successfully edit a product based on its id', async () => {
            const id = '1';
            const dummyProduct = {
                id: '1',
                name: 'Safeguard',
                quantity: 3
            };

            await defaultProductService.editProduct(id, dummyProduct);
           
           expect(mockedProductRepository.editProduct).toBeCalledTimes(1);
           expect(mockedProductRepository.editProduct).toBeCalledWith(id, dummyProduct);
        })
    })

    describe('deleteProduct () -', () => {
        it('should successfully delete a product based on its id', async () => {
            const id = '1';

            await defaultProductService.removeProduct(id);
           
           expect(mockedProductRepository.deleteProduct).toBeCalledTimes(1);
           expect(mockedProductRepository.deleteProduct).toBeCalledWith(id);
        })
    })
})