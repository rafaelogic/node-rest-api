const router = require('express').Router();

const auth = require('../http/controllers/auth/auth-controller');
const register = require('../http/controllers/auth/register-controller');
const authGuest = require('../http/middlewares/auth-guest');

router.get('/logout', auth.logout);

router.post('/login', authGuest, auth.login);
router.post('/register', authGuest, register.index);

module.exports = router;
