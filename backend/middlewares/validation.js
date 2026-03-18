const { Joi } = require('celebrate');
const validator = require('validator');

const validateURL = (value, helpers) => {
    if (validator.isURL(value)) {
        return value;
    }
    return helpers.error('string.uri');
};

const validateUserBody = Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().custom(validateURL)
});
const validateUserAvatar = Joi.object().keys({
    avatar: Joi.string().required.custom(validateURL)
});

const validateCardBody = Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().custom(validateURL)
  });

const validateCardId = Joi.object().keys({
    cardId: Joi.string.required().hex().length(24)
});

module.exports = {
    validateUserBody,
    validateUserAvatar, 
    validateCardBody, 
    validateCardId }