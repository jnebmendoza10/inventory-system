import Joi from 'joi';

export const reviewValidator = Joi.object({
    comment: Joi.string().min(5).max(100),
});
