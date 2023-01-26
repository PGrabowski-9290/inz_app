const router = require('express').Router();
const ModelsController = require('../controllers/modelsController');

router.get('/',ModelsController.get)

module.exports = router