import { Review } from '../../models/base/Review';

export interface ReviewRepository {
    getReviews(productId: string): Promise<Review[]>;
    addReview(review: Partial<Review>): Promise<void>;
    editReview(reviewId: string, newComment: string): Promise<void>;
    deleteReview(reviewId: string): Promise<void>;
}
