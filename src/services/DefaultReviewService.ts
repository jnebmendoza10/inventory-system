import { Review } from '../models/base/Review';
import { ReviewRepository } from '../repositories/base/ReviewRepository';
import { ReviewService } from './base/ReviewService';

export class DefaultReviewService implements ReviewService {
    constructor(private readonly reviewRepository: ReviewRepository) {}

    async createReview(review: Partial<Review>): Promise<void> {
        await this.reviewRepository.addReview(review);
    }
    async retrieveAllReviews(productId: string): Promise<Review[]> {
        const reviews = await this.reviewRepository.getReviews(productId);
        return reviews;
    }
    async editReview(reviewId: string, newComment: string): Promise<void> {
        await this.reviewRepository.editReview(reviewId, newComment);
    }
    async removeReview(reviewId: string): Promise<void> {
        await this.reviewRepository.deleteReview(reviewId);
    }
}
