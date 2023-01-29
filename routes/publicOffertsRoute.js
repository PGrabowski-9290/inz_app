const router = require('express').Router();
const Offerts = require('../controllers/offertsPublicController');

router.post('/', Offerts.getOffertsListPublic);
router.post('/filter', Offerts.getFilteredOffertsListPublic);
router.get('/details/:offertId', Offerts.getOffertDetailsPublic);

module.exports = router;