const router = require('express').Router();
const { checkProductData, checkProductId } = require('../utils/validation');

const {
  postProduct,
  getProduct,
  deleteProductById,
} = require('../controllers/products');

router.post('', checkProductData(), postProduct);

router.get('', getProduct);

router.delete('/:id', checkProductId(), deleteProductById);

module.exports = router;