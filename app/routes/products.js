const router = require('express').Router();
const authJwt = require('../http/middlewares/auth-jwt');
const authUser = require('../http/middlewares/auth-user');
const product = require('../http/controllers/product-controller');

router.get('/', [authJwt, authUser], product.all);
router.post('/create', [authJwt, authUser], product.create);

module.exports = router;