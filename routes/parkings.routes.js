const express = require('express');
const router = express.Router();
// const uploadConfig = require('../configs/multer.config');

const parkingsController = require('../controllers/parkings.controller');
// const phonesMiddleware = require('../middleware/phones.middleware');
// const secureMiddleware = require('../middleware/secure.middleware');

router.get('/', parkingsController.list);
router.post('/', parkingsController.create);
router.get('/:id', parkingsController.get);
router.put('/:id', parkingsController.edit);
router.delete('/:id', parkingsController.delete);

module.exports = router;