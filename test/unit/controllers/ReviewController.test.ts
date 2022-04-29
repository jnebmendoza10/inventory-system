import { NextFunction, request, Request, response, Response } from "express";
import { mock, mockClear, mockReset } from "jest-mock-extended";
import { InvalidRequestError } from "../../../src/controllers/errors/InvalidRequestError";
import { ReviewController } from "../../../src/controllers/ReviewController";
import { ReviewService } from "../../../src/services/base/ReviewService";
import { Logger } from "../../../src/utils/Logger";





describe('ProductController tests', () => {
    const mockReviewService = mock<ReviewService>();
    const mockLogger = mock<Logger>();

    const req: Request = expect.any(request);
    const res: Response = expect.any(response);
    const next: NextFunction = jest.fn();

    let reviewController : ReviewController;

    beforeEach(() => {
        mockReset(mockReviewService)
        mockClear(mockReviewService)

        mockReset(mockLogger)
        mockClear(mockLogger)

        mockReset(next)
        mockClear(next)

        jest.resetAllMocks();

        reviewController = new ReviewController(mockReviewService, mockLogger);
    })

    describe('createReview', () => {
        it('should successfully create a review', async () => {
            res.locals = {
                jwtPayload : {id: '1'}
            }
            const userId = res.locals.jwtPayload.id;
            req.body = {
                productId: '2',
                customerComment: 'So good'
            }
            const {productId, customerComment} = req.body;
            const dummyReview = {
                customer: userId,
                product : productId,
                comment: customerComment
            };
            res.status = jest.fn().mockReturnThis();
            res.json = jest.fn()

            await reviewController.createReview(req, res, next)

            expect(next).toBeCalledTimes(0);
            expect(mockReviewService.createReview).toBeCalledTimes(1);
            expect(mockReviewService.createReview).toBeCalledWith(dummyReview);
            expect(res.status).toBeCalledTimes(1);
            expect(res.status).toBeCalledWith(201);
            expect(res.json).toBeCalledTimes(1);
            expect(res.json).toBeCalledWith({ message: 'Review successfully published' });

        })

        it('should call next function if the system failed to create a review', async () => {
            res.locals = {
                jwtPayload : {id: '1'}
            }
            const userId = res.locals.jwtPayload.id;
            req.body = {
                productId: '2',
                customerComment: 'So good'
            }
            const {productId, customerComment} = req.body;
            const dummyReview = {
                customer: userId,
                product : productId,
                comment: customerComment
            };
            const error = new Error();

            mockReviewService.createReview.mockRejectedValueOnce(error);
            
            await reviewController.createReview(req, res, next);

           expect(mockReviewService.createReview).toBeCalledTimes(1);
           expect(mockReviewService.createReview).toBeCalledWith(dummyReview);
           expect(mockLogger.error).toBeCalledTimes(1);
           expect(mockLogger.error).toBeCalledWith('Failed to create a review', error);
           expect(next).toBeCalledTimes(1);
           expect(next).toBeCalledWith(error);

        })
    })
    describe('retrieveReviewsOfProducts () - ', () => {
        it('should successfully retrieve all reviews of a product', async () => {
            req.params = {
                productId: '1'
            }
            res.status = jest.fn().mockReturnThis();
            res.json = jest.fn();
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
           mockReviewService.retrieveAllReviews.mockResolvedValueOnce(dummyReviews);

           await reviewController.retrieveReviewsOfProduct(req, res, next);

           expect(next).toBeCalledTimes(0);
           expect(mockReviewService.retrieveAllReviews).toBeCalledTimes(1);
           expect(mockReviewService.retrieveAllReviews).toBeCalledWith(req.params.productId)
           expect(res.status).toBeCalledTimes(1);
           expect(res.status).toBeCalledWith(200);
           expect(res.json).toBeCalledTimes(1);
           expect(res.json).toBeCalledWith(dummyReviews);
        })

        it('should throw an error if the productId input is invalid', async () => {
            const error = new Error();
            req.params = {
                productId: undefined
            }

            await reviewController.retrieveReviewsOfProduct(req, res, next);

            expect(next).toBeCalledTimes(1);
            expect(next).toBeCalledWith(new InvalidRequestError());
            
        })

        it('should call the next function if the system failed to retrieve reviews', async () => {
            const error = new Error();
            req.params = {
                productId: '1123'
            }
            mockReviewService.retrieveAllReviews.mockRejectedValueOnce(error);

            await reviewController.retrieveReviewsOfProduct(req, res, next);

            expect(mockReviewService.retrieveAllReviews).toBeCalledTimes(1);
            expect(mockReviewService.retrieveAllReviews).toBeCalledWith(req.params.productId);
            expect(mockLogger.error).toBeCalledTimes(1);
            expect(mockLogger.error).toBeCalledWith('Failed to retrieve reviews of a product', error);
            expect(next).toBeCalledTimes(1);
            expect(next).toBeCalledWith(error);
        })

    })

    describe('editReview () - ', () => {
        it('should successfully edit review by id', async () => {
            req.params = {
                reviewId : '1'
            }
            const { reviewId } = req.params;
            req.body = {
                comment: 'so nice so good'
            }
            const { comment } = req.body;
            res.status = jest.fn().mockReturnThis();
            res.json = jest.fn();

          
           await reviewController.editReview(req, res, next);

           expect(next).toBeCalledTimes(0);
           expect(mockReviewService.editReview).toBeCalledTimes(1);
           expect(mockReviewService.editReview).toBeCalledWith(reviewId, comment);
           expect(res.status).toBeCalledTimes(1);
           expect(res.status).toBeCalledWith(200);
           expect(res.json).toBeCalledTimes(1);
           expect(res.json).toBeCalledWith({message: 'Updated successfully'});
        })

        it('should throw an error if the reviewtId input is invalid', async () => {
            const error = new Error();
            req.params = {
                reviewId: undefined
            }

            await reviewController.editReview(req, res, next);

            expect(next).toBeCalledTimes(1);
            expect(next).toBeCalledWith(new InvalidRequestError());
            
        })

        it('should call the next function if the system failed to edit a product', async () => {
            const error = new Error();
            req.params = {
                reviewId : '1'
            }
            const { reviewId } = req.params;
            req.body = {
                comment: 'so nice so good'
            }
            const { comment } = req.body;
            mockReviewService.editReview.mockRejectedValueOnce(error);

            await reviewController.editReview(req, res, next);

            expect(mockReviewService.editReview).toBeCalledTimes(1);
            expect(mockReviewService.editReview).toBeCalledWith(reviewId, comment)
            expect(mockLogger.error).toBeCalledTimes(1);
            expect(mockLogger.error).toBeCalledWith('Failed to update a review', error);
            expect(next).toBeCalledTimes(1);
            expect(next).toBeCalledWith(error);
        })

    })

    describe('removeReview () - ', () => {
        it('should successfully remove a review by id', async () => {
            res.status = jest.fn().mockReturnThis();
            res.json = jest.fn();
     
           req.params = {
               reviewId : '1'
           }
           
           await reviewController.removeReview(req, res, next);

           expect(next).toBeCalledTimes(0);
           expect(mockReviewService.removeReview).toBeCalledTimes(1);
           expect(mockReviewService.removeReview).toBeCalledWith(req.params.reviewId);
           expect(res.status).toBeCalledTimes(1);
           expect(res.status).toBeCalledWith(200);
           expect(res.json).toBeCalledTimes(1);
           expect(res.json).toBeCalledWith({message: 'Review deleted successfully'});
        })

        it('should throw an error if the reviewId input is invalid', async () => {
            const error = new Error();
            req.params = {
                removeId: undefined
            }

            await reviewController.removeReview(req, res, next);

            expect(next).toBeCalledTimes(1);
            expect(next).toBeCalledWith(new InvalidRequestError());
            
        })

        it('should call the next function if the system failed to delete a review', async () => {
            const error = new Error();
            req.params = {
                reviewId: '13123123'
            }
         
           mockReviewService.removeReview.mockRejectedValueOnce(error);

            await reviewController.removeReview(req, res, next);

            expect(mockReviewService.removeReview).toBeCalledTimes(1);
            expect(mockReviewService.removeReview).toBeCalledWith(req.params.reviewId)
            expect(mockLogger.error).toBeCalledTimes(1);
            expect(mockLogger.error).toBeCalledWith('Failed to delete a review', error);
            expect(next).toBeCalledTimes(1);
            expect(next).toBeCalledWith(error);
        })

    })

    
})