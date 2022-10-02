const router = require('express').Router();
const authJwt = require('../http/middlewares/auth-jwt');
const authUser = require('../http/middlewares/auth-user');
const user = require('../http/controllers/user-controller');

router.get('/:id/products', [authJwt, authUser], user.products);

module.exports = router;