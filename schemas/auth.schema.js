const Joi = require('joi');

//new schema for auth users
const email = Joi.string().email();
const password = Joi.string().min(8);

const token = Joi.string().min(32);

const authUserSchema = Joi.object({
    email: email.required(),
    password: password.required()
});

const recoveryPasswordSchema = Joi.object({
    email: email.required()
});

const createNewPasswordSchema = Joi.object({
    token: token.required(),
    password: password.required()
})

module.exports = { authUserSchema, recoveryPasswordSchema, createNewPasswordSchema }