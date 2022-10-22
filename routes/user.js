const userController = require("../controllers/userController");
const { verifyRole } = require("../middleware/auth");
const router = require('express').Router();
const authMid = require("../middleware/auth");
const role = require("../config/config").roles;

router.get('/get', authMid.verifyJWT, userController.getUser)
router.get('/list', authMid.verifyJWT, verifyRole(role.Admin),userController.getUsersList )

module.exports = router