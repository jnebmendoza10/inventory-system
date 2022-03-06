import { Application } from 'express';
import { ReviewController } from '../controllers/ReviewController';
import { checkRoleAdmin, checkRoleCustomer } from '../middlewares/checkRole';
import { validateJwt } from '../middlewares/validateJwt';
import { validateSchema } from '../middlewares/validateSchema';
import { Route } from './Route';

export class ReviewRoute implements Route {
    constructor(private readonly reviewController: ReviewController) {}

    mountRoute(application: Application): void {
        application.post(
            '/api/v1/review/create',
            [validateJwt, checkRoleCustomer, validateSchema('reviewValidator')],
            this.reviewController.createReview,
        );

        application.get(
            '/api/v1/reviews/productId',
            [validateJwt, checkRoleAdmin],
            this.reviewController.retrieveReviewsOfProducts,
        );

        application.patch(
            '/api/v1/review/edit/reviewId',
            [validateJwt, checkRoleCustomer, validateSchema('reviewValidator')],
            this.reviewController.editReview,
        );

        application.delete(
            '/api/v1/review/delete/reviewId',
            [validateJwt, checkRoleCustomer],
            this.reviewController.removeReview,
        );
    }
}
