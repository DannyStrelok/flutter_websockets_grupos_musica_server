/**
 * path: api/users
 */
const {Router, response} = require('express');
const { check } = require('express-validator');
const { validarJWT } = require('../middlewares/jwt-validator');
const {getUsers} = require('../controllers/users');

const router = Router();

router.get('/', validarJWT, getUsers);

module.exports = router;
