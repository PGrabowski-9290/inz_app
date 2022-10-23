const userController = require("../controllers/userController");
const { verifyRole, verifyJWT } = require("../middleware/auth");
const router = require('express').Router();
const role = require("../config/config").roles;

router.get('/', verifyJWT, userController.getLoggedUser)
router.put('/', verifyJWT, userController.updateLoggedUser)
router.get('/get', verifyJWT, verifyRole(role.Admin), userController.getUser)
router.put('/update', verifyJWT, verifyRole(role.Admin), userController.updateUser)
router.get('/list', verifyJWT, verifyRole(role.Admin), userController.getUsersList)

module.exports = router