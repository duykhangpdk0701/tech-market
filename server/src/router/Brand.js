const express = require('express');
const router = express.Router();
const brandController = require('../controller/BrandController')

router.get('/',brandController.showAll)
router.get('/:id',brandController.show)
router.post('/store',brandController.store)
router.put('/:id',brandController.update)
router.delete('/:id',brandController.delete)


module.exports = router 