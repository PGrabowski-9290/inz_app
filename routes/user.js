const usersController = require("../controllers/userController");
const router = require('express').Router();
const authMid = require("../middleware/auth");
const role = require("../config/config").roles;

router.get('/get', authMid.verifyJWT, usersController.getUser)

module.exports = router