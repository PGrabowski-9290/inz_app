const router = require("express").Router();
const Salons = require("../controllers/salonsController");
const {verifyJWT, verifyRole} = require("../middleware/auth");
const role = require("../config/config").roles;

router.get('/', Salons.getActiveSalonsList);
router.post('/add', verifyJWT, verifyRole(role.Admin), Salons.createSalon );
router.get('/:salonId', verifyJWT, verifyRole(role.Admin, role.User), Salons.getSalon);
router.put('/:salonId', verifyJWT, verifyRole(role.Admin,), Salons.getSalon);
router.get('/list', verifyJWT, verifyRole(role.Admin), Salons.getSalonsList);
router.put('/active/:salonId', verifyJWT, verifyRole(role.Admin), Salons.updateActiveStatus);
// router.put('/addUsers/:salonId', verifyJWT, verifyRole(role.Admin), Salons.)

module.exports = router;