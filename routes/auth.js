/**
 * path: api/login
 */
const {Router, response} = require('express');
const { check } = require('express-validator');
const { crearUsuario } = require('../controllers/auth');
const { fieldValidator } = require('../middlewares/field-validator');

const router = Router();

router.post('/new', [
    check('nombre', 'El nombre es obligatorio').notEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'La password es obligatorio y debe ser tener 6 caracteres mínimo').isLength({min: 6}),
    fieldValidator
], crearUsuario);

module.exports = router;
