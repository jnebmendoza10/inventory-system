import Joi from 'joi';

export const userChangePasswordValidator = Joi.object({
    password: Joi.string().min(8).required(),
});
