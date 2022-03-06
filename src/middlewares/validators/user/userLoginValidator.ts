import Joi from 'joi';

export const userLoginValidator = Joi.object({
    username: Joi.string().min(4).max(12).required(),
    password: Joi.string().min(8).required(),
});
