const express = require('express');
const router = express.Router();
const productController = require('../controller/ProductController')

router.get('/',productController.showAll)
router.get('/:id',productController.show)
router.post('/store',productController.store)
router.put('/:id',productController.update)
router.delete('/:id',productController.delete)


module.exports = router 