const router = require('express').Router();
const Offers = require('../controllers/offersController');
const {verifyJWT, verifyRole} = require("../middleware/auth");
const role = require("../config/config").roles;


router.get('/', Offers.getOffersList);
router.post('/new', verifyJWT, verifyRole(role.Admin, role.User), Offers.createOffert);

module.exports = router;