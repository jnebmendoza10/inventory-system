import { NextFunction, Request, Response } from 'express';
import { ReviewService } from '../services/base/ReviewService';
import { Review } from '../models/base/Review';
import { InvalidRequestError } from './errors/InvalidRequestError';

export class ReviewController {
    constructor(private readonly reviewService: ReviewService) {}

    createReview = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userId = res.locals.jwtPayload.id;
            const { productId, customerComment } = req.body;
            const review: Partial<Review> = {
                customer: userId,
                product: productId,
                comment: customerComment,
            };

            await this.reviewService.createReview(review);

            res.status(201).send();
        } catch (error) {
            next(error);
        }
    };

    retrieveReviewsOfProducts = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { productId } = req.params;
            if (productId === undefined) {
                next(new InvalidRequestError());
            }
            const reviews = await this.reviewService.retrieveAllReviews(productId);

            reviews.length > 0 ? res.status(200).json(reviews) : next(new Error());
        } catch (error) {
            next(error);
        }
    };

    editReview = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { reviewId } = req.params;
            if (reviewId === undefined) {
                next(new InvalidRequestError());
            }
            const { comment } = req.body;

            await this.reviewService.editReview(reviewId, comment);

            res.status(200).json({ message: 'Updated Successfully' });
        } catch (error) {
            next(error);
        }
    };

    removeReview = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { reviewId } = req.params;
            if (reviewId === undefined) {
                next(new InvalidRequestError());
            }

            await this.reviewService.removeReview(reviewId);

            res.status(200).json({ message: 'Review deleted successfully' });
        } catch (error) {
            next(error);
        }
    };
}
