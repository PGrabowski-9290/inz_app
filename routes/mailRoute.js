const router = require('express').Router();
const mailController = require('../controllers/mailControler')

router.post('/send', mailController.sendMail)

module.exports = router