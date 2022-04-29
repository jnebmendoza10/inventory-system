import { ReviewModel } from "../../../src/models/sequelize/ReviewSequelize";
import { SqlReviewRepository } from "../../../src/repositories/SqlReviewRepository"



describe('SqlReviewRepository tests', () => {

    let reviewRepository: SqlReviewRepository;

    beforeEach(() => {
        reviewRepository = new SqlReviewRepository;
    })

    describe('getReviews () - ', () => {
        it('should retrieve reviews of a product', async () => {
            const productId = '1';
            const mockedProductReviews = [{
                id: '1',
                product: productId,
                customer: '1',
                comment: 'nice'
            },
            {
                id: '2',
                product: productId,
                customer: '3',
                comment: ' very nice'
            }]
            ReviewModel.findAll = jest.fn().mockResolvedValueOnce(mockedProductReviews);

            const reviews = await reviewRepository.getReviews(productId);

            expect(reviews).toEqual(mockedProductReviews);
            expect(ReviewModel.findAll).toBeCalledTimes(1);
            expect(ReviewModel.findAll).toBeCalledWith({ where: { product: productId } })
        })
    })

    describe('addReview () - ', () => {
        it('should successfully add a review', async () => {
            const mockedReview = {
                product: '3',
                customer: '4',
                comment: 'nice'
            };

            ReviewModel.create = jest.fn();

            await reviewRepository.addReview(mockedReview);

            expect(ReviewModel.create).toBeCalledTimes(1);
            expect(ReviewModel.create).toBeCalledWith(mockedReview);
        })
    })

    describe('editReview () - ', () => {
        it('should successfully edit a review by id', async () => {
            const id = '1';
            const comment = 'nice';

            ReviewModel.update = jest.fn();

            await reviewRepository.editReview(id, comment);

            expect(ReviewModel.update).toBeCalledTimes(1);
            expect(ReviewModel.update).toBeCalledWith({ comment: comment }, { where: { id: id } })
        })
    })

    describe('deleteReview () - ', () => {
        it('should successfully delete a review by id', async () => {
            const id = '1';
            
            ReviewModel.destroy = jest.fn();

            await reviewRepository.deleteReview(id);

            expect(ReviewModel.destroy).toBeCalledTimes(1);
            expect(ReviewModel.destroy).toBeCalledWith({ where: { id: id } })
        })
    })
})