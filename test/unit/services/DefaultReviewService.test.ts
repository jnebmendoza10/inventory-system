import { mock, mockClear } from "jest-mock-extended";
import { ReviewRepository } from "../../../src/repositories/base/ReviewRepository";
import { DefaultReviewService } from "../../../src/services/DefaultReviewService";


describe('DefaultReviewService.test.ts', () => {
    const mockedReviewRepository = mock<ReviewRepository>();
    let defaultReviewService : DefaultReviewService;

    beforeEach(() => {
        mockClear(mockedReviewRepository);
        defaultReviewService = new DefaultReviewService(mockedReviewRepository);
    })

    describe('createReview () - ', () => {
        it('should successfully create a review', async() => {
            const dummyReview = {
                id: '1',
                product: '1',
                customer: '1',
                comment: 'So nice so good'
            };

            await defaultReviewService.createReview(dummyReview);

            expect(mockedReviewRepository.addReview).toBeCalledTimes(1);
            expect(mockedReviewRepository.addReview).toBeCalledWith(dummyReview);
        })
    })

    describe('retrieveAllReviews () - ', () => {
        it('should successfully retrieve all reviews', async() => {
            const productId = '1';
            const dummyReviews = [{
                id: '1', 
                product: '1',
                customer: '2',
                comment: 'So nice so good'
           },{
                id: '2', 
                customer: '1',
                product: '1',
                comment: 'Ayun ok naman'
           }];

            mockedReviewRepository.getReviews.mockResolvedValueOnce(dummyReviews);
            const reviews = await defaultReviewService.retrieveAllReviews(productId);

            expect(reviews).toBe(dummyReviews);
            expect(mockedReviewRepository.getReviews).toBeCalledTimes(1);
            expect(mockedReviewRepository.getReviews).toBeCalledWith(productId);
        })
    })

    describe('editReview () -', () => {
        it('should successfully edit a review based on the review id', async () => {
            const id = '1';
            const dummyReview = 'so nice so good';

            await defaultReviewService.editReview(id, dummyReview);

            expect(mockedReviewRepository.editReview).toBeCalledTimes(1);
            expect(mockedReviewRepository.editReview).toBeCalledWith(id, dummyReview);
        })
    })

    describe('removeReview', () => {
        it('should successfully remove a review by its id', async () => {
            const id = '1';

            await defaultReviewService.removeReview(id);

            expect(mockedReviewRepository.deleteReview).toBeCalledTimes(1);
            expect(mockedReviewRepository.deleteReview).toBeCalledWith(id);
        })
    })
})