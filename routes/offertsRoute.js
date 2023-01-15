const router = require('express').Router();
const Offerts = require('../controllers/offertsController');
const {verifyJWT, verifyRole} = require("../middleware/auth");
const role = require("../config/config").roles;
const multer = require('multer');
const storage = require('../config/config').storage;
const upload = multer({ storage: storage });


router.get('/', Offerts.getOffertsList);
router.get('/filter', Offerts.getFilteredOffertsList);
router.get('/details/:offertId', Offerts.getOffertDetails);
router.post('/new', verifyJWT, verifyRole(role.Admin, role.User), upload.array("photos", 5), Offerts.createOffert);
router.patch('/update/:offertId', verifyJWT, verifyRole(role.Admin, role.User), Offerts.updateOffert);

module.exports = router;