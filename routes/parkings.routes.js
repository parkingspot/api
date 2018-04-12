const express = require('express');
const router = express.Router();
// const uploadConfig = require('../configs/multer.config');

const parkingsController = require('../controllers/parkings.controller');
// const phonesMiddleware = require('../middleware/phones.middleware');
const secureMiddleware = require('../middleware/secure.middleware');
const roleMiddleware = require('../middleware/role.middleware');

router.get('/', /*secureMiddleware.isAuthenticated,*/ parkingsController.list);
router.post('/', /*secureMiddleware.isAuthenticated, roleMiddleware.isAdmin,*/ parkingsController.create);
router.get('/:id', secureMiddleware.isAuthenticated, parkingsController.get);
router.put('/:id', /*secureMiddleware.isAuthenticated, roleMiddleware.isAdmin,*/ parkingsController.edit);
router.delete('/:id', /*secureMiddleware.isAuthenticated, roleMiddleware.isAdmin,*/ parkingsController.delete);

module.exports = router;