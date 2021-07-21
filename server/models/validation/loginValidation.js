const Joi = require("@hapi/joi");

const LoginValidator = (data) => {
    const LoginSchema = Joi.object().keys({
        email: Joi.string().min(6).max(255).email().required(),
        password: Joi.string().min(8).max(255).required(),
    });
    return Joi.validate(data, LoginSchema);
};

module.exports = LoginValidator;
