import { Review } from '../models/base/Review';
import { ReviewModel } from '../models/sequelize/ReviewSequelize';
import { ReviewRepository } from './base/ReviewRepository';

export class SqlReviewRepository implements ReviewRepository {
    async getReviews(productId: string): Promise<Review[]> {
        const reviews = await ReviewModel.findAll({ where: { product: productId } });
        return reviews;
    }
    async addReview(review: Partial<Review>): Promise<void> {
        await ReviewModel.create(review);
    }
    async editReview(reviewId: string, newComment: string): Promise<void> {
        await ReviewModel.update({ comment: newComment }, { where: { id: reviewId } });
    }
    async deleteReview(reviewId: string): Promise<void> {
        await ReviewModel.destroy({ where: { id: reviewId } });
    }
}
