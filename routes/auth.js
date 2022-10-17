const router = require('Express').Router();
const authController = require('../controllers/authController');
const authMid = require("../middleware/auth");
const role = require("../config/config").roles;

router.post('/login', authController.login);
router.post('/register',authMid.verifyJWT, authMid.verifyRole(role.Admin), authController.register);
router.get('/logout',authMid.verifyJWT, authController.logout);
router.get('/refresh', authController.refreshToken);

module.exports = router;