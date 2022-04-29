import { NextFunction, Request, Response } from 'express';
import { ReviewService } from '../services/base/ReviewService';
import { Review } from '../models/base/Review';
import { InvalidRequestError } from './errors/InvalidRequestError';
import { Logger } from '../utils/Logger';

export class ReviewController {
    constructor(private readonly reviewService: ReviewService, private readonly logger: Logger) {}

    createReview = async (req: Request, res: Response, next: NextFunction) => {
        try {
            this.logger.info(`Incoming ${req.method} request`, req.body);

            const userId = res.locals.jwtPayload.id;
            const { productId, customerComment } = req.body;
            const review: Omit<Review, 'id'> = {
                customer: userId,
                product: productId,
                comment: customerComment,
            };

            await this.reviewService.createReview(review);

            res.status(201).json({ message: 'Review successfully published' });
        } catch (error: any) {
            this.logger.error('Failed to create a review', error);
            next(error);
        }
    };

    retrieveReviewsOfProduct = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { productId } = req.params;
            if (productId === undefined) {
                this.logger.error('Invalid productId', productId);
                throw new InvalidRequestError();
            }
            const reviews = await this.reviewService.retrieveAllReviews(productId);

            res.status(200).json(reviews);
        } catch (error: any) {
            this.logger.error('Failed to retrieve reviews of a product', error);
            next(error);
        }
    };

    editReview = async (req: Request, res: Response, next: NextFunction) => {
        try {
            this.logger.info(`Incoming ${req.method} request`, req.body);
            const { reviewId } = req.params;
            if (reviewId === undefined) {
                this.logger.error('Invalid reviewId', reviewId);
                throw new InvalidRequestError();
            }
            const { comment } = req.body;

            await this.reviewService.editReview(reviewId, comment);

            res.status(200).json({ message: 'Updated successfully' });
        } catch (error: any) {
            this.logger.error('Failed to update a review', error);
            next(error);
        }
    };

    removeReview = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { reviewId } = req.params;
            if (reviewId === undefined) {
                this.logger.error('Invalid reviewId', reviewId);
                throw new InvalidRequestError();
            }

            await this.reviewService.removeReview(reviewId);

            res.status(200).json({ message: 'Review deleted successfully' });
        } catch (error: any) {
            this.logger.error('Failed to delete a review', error);
            next(error);
        }
    };
}
