const settingsController = require('../controllers/settingsController');
const { verifyJWT, verifyRole } = require('../middleware/auth');
const router = require('express').Router();
const role = require('../config/config').roles;

router.get('/get', verifyJWT, verifyRole(role.Admin), settingsController.getSettings);
router.put('/update', verifyJWT, verifyRole(role.Admin), settingsController.updateSettings);

module.exports = router;