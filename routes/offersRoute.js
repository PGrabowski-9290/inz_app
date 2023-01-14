const router = require('express').Router();
const Offers = require('../controllers/offersController');
const {verifyJWT, verifyRole} = require("../middleware/auth");
const role = require("../config/config").roles;
const multer = require('multer');
const storage = require('../config/config').storage;
const upload = multer({ storage: storage });


router.get('/', Offers.getOffersList);
router.get('/filter', Offers.getFilteredOffersList);
router.get('/details/:offertId', Offers.getOffertDetails);
router.post('/new', verifyJWT, verifyRole(role.Admin, role.User), upload.array("photos", 5), Offers.createOffert);
router.patch('/update/:offertId', verifyJWT, verifyRole(role.Admin, role.User), Offers.updateOffert);

module.exports = router;