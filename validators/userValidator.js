const Joi = require('joi');

const userSchema = Joi.object({
    name: Joi.string().trim().min(1).required().messages({
        'string.empty': `"name" cannot be empty`,
        'any.required': `"name" is required`
    }),
    role: Joi.string().trim().min(1).required().messages({
        'string.empty': `"role" cannot be empty`,
        'any.required': `"role" is required`
    })
});

module.exports = { userSchema };
