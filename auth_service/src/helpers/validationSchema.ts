import Joi from "joi";

export const authSchema = Joi.object({
    userName: Joi.string().lowercase().required(),
    password: Joi.string().min(4).required()
});
