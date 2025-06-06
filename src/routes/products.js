const express = require('express');
const router = express.Router();
const productController = require('../controller/products.js');

router.get('/', productController.getAllProducts)

router.post('/', productController.createNewProducts)

module.exports = router;