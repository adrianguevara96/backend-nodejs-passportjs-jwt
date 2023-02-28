const Joi = require('joi');

//new schema for auth users
const email = Joi.string().email();
const password = Joi.string().min(8);

const authUserSchema = Joi.object({
    email: email.required(),
    password: password.required()
});

module.exports = { authUserSchema }