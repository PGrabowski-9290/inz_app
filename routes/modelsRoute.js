const router = require('express').Router();
const ModelsController = require('../controllers/modelsController');

router.post('/',ModelsController.get)

module.exports = router