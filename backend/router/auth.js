/*
path: api/login
*/

const {Router} =require('express');
const { check } = require('express-validator');

///controladores
const {createUser,login,renewToken} = require('../controllers/auth');
const validarCampos = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router =Router();

//crear nuevos usuarios
router.post('/new',[
    check('name','nombre es obligatorio').not().isEmpty(),
    check('email','email es obligatorio').isEmail(),
    check('password','password es obligatorio').not().isEmpty(),
    validarCampos

],createUser);

//login
router.post('/',[
    check('email','email es obligatorio').isEmail(),
    check('password','password es obligatorio').not().isEmpty(),
    validarCampos
],login)

//revalidar token
router.get('/renew',validarJWT,renewToken)


module.exports=router