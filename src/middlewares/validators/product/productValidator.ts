import Joi from 'joi';

export const productValidator = Joi.object({
    name: Joi.string().min(2).max(30).required(),
    quantity: Joi.number().required(),
});
