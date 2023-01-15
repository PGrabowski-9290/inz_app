const router = require('express').Router();
const Offerts = require('../controllers/offertsPublicController');

router.get('/', Offerts.getOffertsListPublic);
router.get('/filter', Offerts.getFilteredOffertsListPublic);
router.get('/details/:offertId', Offerts.getOffertDetailsPublic);

module.exports = router;