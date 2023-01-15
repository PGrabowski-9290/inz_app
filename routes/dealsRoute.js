const router = require('express').Router();
const dealsController = require('../controllers/dealsController');
const { verifyJWT, verifyRole } = require('../middleware/auth');
const roles = require('../config/config').roles;

router.post('/new', verifyJWT, verifyRole(roles.Admin), dealsController.createDeal);

module.exports = router;