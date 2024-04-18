const { celebrate, Joi } = require('celebrate');

function checkSignIn() {
  return celebrate({
    body: Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    }),
  });
}

function checkSignUp() {
  return celebrate({
    body: Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      name: Joi.string().min(1).max(30),
      surname: Joi.string().min(1).max(30),
    }),
  });
}

function checkProductData() {
  return celebrate({
    body: Joi.object().keys({
      amount: Joi.number().required(),
      category: Joi.string().required(),
      description: Joi.string().required(),
      id: Joi.number().required(),
      // eslint-disable-next-line no-useless-escape
      image: Joi.string().required().regex(/https?:\/\/(www\.)?[\w\-\.\_\~\:\/\?\#\[\]\@\!\$\&\'\(\)\*\+\,\;\=]+\#?$/i),
      // eslint-disable-next-line no-useless-escape
      price: Joi.number().required(),
      rating: Joi.object().required(),
      title: Joi.string().required(),
    }),
  });
}

function checkProductId() {
  return celebrate({
    params: Joi.object().keys({
      id: Joi.string().required(),
    }),
  });
}

function checkUserPatch() {
  return celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(1).max(30),
      surname: Joi.string().min(1).max(30),
    }),
  });
}

module.exports = {
  checkSignIn,
  checkSignUp,
  checkProductData,
  checkProductId,
  checkUserPatch,
};
