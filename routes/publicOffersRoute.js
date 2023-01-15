const router = require('express').Router();
const Offers = require('../controllers/offersPublicController');

router.get('/', Offers.getOffersListPublic);
router.get('/filter', Offers.getFilteredOffersListPublic);
router.get('/details/:offertId', Offers.getOffertDetailsPublic);

module.exports = router;