const Joi = require("@hapi/joi");

const RegisterValidator = (data) => {
    const RegisterSchema = Joi.object().keys({
        username: Joi.string().min(3).max(50).required(),
        email: Joi.string().min(6).max(255).email().required(),
        password: Joi.string().min(8).max(255).required(),
        age: Joi.number().integer().required(),
    });
    return Joi.validate(data, RegisterSchema);
};

module.exports = RegisterValidator;
