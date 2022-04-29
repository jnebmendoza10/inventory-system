import { Review } from '../../models/base/Review';

export interface ReviewService {
    retrieveAllReviews(productId: string): Promise<Review[]>;
    createReview(review: Partial<Review>): Promise<void>;
    editReview(reviewId: string, newComment: string): Promise<void>;
    removeReview(reviewId: string): Promise<void>;
}
