import Joi from 'joi';

export const userRegistrationValidator = Joi.object({
    name: Joi.string().min(2).max(30).required(),
    role: Joi.string().valid('Admin', 'Customer').required(),
    username: Joi.string().min(4).max(12).required(),
    password: Joi.string().min(8).required(),
});
