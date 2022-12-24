const express = require('express');

const productController = require('../controllers/productController')

const router = express.Router();


router.post('/add-Product',productController.addProduct)

router.get('/products',productController.getProducts)

module.exports = router;