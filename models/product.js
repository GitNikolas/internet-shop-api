const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  id: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator(url) {
        // eslint-disable-next-line no-useless-escape
        const regex = /https?:\/\/(www\.)?[\w\-\.\_\~\:\/\?\#\[\]\@\!\$\&\'\(\)\*\+\,\;\=]+\#?$/i;
        return regex.test(url);
      },
      message: 'Некорректный url',
    },
  },
  price: {
    type: Number,
    required: true,
  },
  rating: {
    type: Object,
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'product',
    required: true,
  },
  title: {
    type: String,
    required:true,
  }
});

module.exports = mongoose.model('product', productSchema);
