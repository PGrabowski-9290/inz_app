const router = require("express").Router();
const Salons = require("../controllers/salonsController");
const {verifyJWT, verifyRole} = require("../middleware/auth");
const role = require("../config/config").roles;

router.get('/', Salons.getActiveSalonsList);
router.post('/add', verifyJWT, verifyRole(role.Admin), Salons.createSalon );
router.get('/details/:salonId', verifyJWT, verifyRole(role.Admin, role.User), Salons.getSalon);
router.patch('/update/:salonId', verifyJWT, verifyRole(role.Admin,), Salons.updateSalon);
router.get('/list', verifyJWT, verifyRole(role.Admin), Salons.getSalonsList);
router.patch('/active/:salonId', verifyJWT, verifyRole(role.Admin), Salons.updateActiveStatus);
router.put('/users/:salonId', verifyJWT, verifyRole(role.Admin), Salons.updateUsers);

module.exports = router;