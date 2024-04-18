const {
    HTTP_STATUS_CREATED, HTTP_STATUS_OK,
  } = require('http2').constants;
  require('dotenv').config();
  
  const mongoose = require('mongoose');
  const productModel = require('../models/product');
  const BadRequestError = require('../errors/bad-request-error');
  const NotFoundError = require('../errors/not-found-error');
  
  const postProduct = (req, res, next) => {
    const {
      amount, category, description, id,
      image, price, rating, title,
    } = req.body;
    const { _id } = req.user;
  
    return productModel.create({
      amount,
      category,
      description,
      id,
      image,
      price,
      rating,
      owner: _id,
      title,
    })
      .then((response) => { res.status(HTTP_STATUS_CREATED).send(response); })
      .catch((err) => {
        if (err instanceof mongoose.Error.ValidationError) {
          next(new BadRequestError(`Некорректные данные: ${err.name}`));
        }
        return next(err);
      });
  };
  
  const getProduct = (req, res, next) => {
    const { _id } = req.user;
    productModel.find({ owner: _id })
      .then((response) => {
        res.status(HTTP_STATUS_OK).send(response);
      })
      .catch(next);
  };
  
  const deleteProductById = (req, res, next) => {
    const { id } = req.params;
    return productModel.findOne({ id })
      .orFail()
      .then((film) => film.deleteOne())
      .then((filmData) => res.status(HTTP_STATUS_OK).send(filmData))
      .catch((err) => {
        if (err instanceof mongoose.Error.CastError) {
          return next(new BadRequestError(`Некорректный id: ${id}`));
        }
        if (err instanceof mongoose.Error.DocumentNotFoundError) {
          return next(new NotFoundError(`Продукт с указанным id не найден: ${id}`));
        }
        return next(err);
      });
  };
  
  module.exports = {
    postProduct,
    getProduct,
    deleteProductById,
  };
  