const { response } = require("express")
const bcrypt = require('bcryptjs');
const { validationResult } = require("express-validator")

const UserSchema = require('../models/user');
const { generarJWT } = require("../helpers/jwt");

const crearUsuario = async (req, res = response) => {

    const {email, password, nombre} = req.body;

    try {

        const emailDuplicate = await UserSchema.findOne({email: email})
        if(emailDuplicate) {
            return res.status(400).json({
                ok: false,
                msg: 'El email ya existe'
            })
        }

        const usuario = new UserSchema(req.body);

        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);

        await usuario.save();

        const token = await generarJWT(usuario.id);

        res.json({
            ok:true,
            usuario,
            token
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error 500'
        })
    }


}

const login = async (req, res = response) => {

    const {email, password} = req.body;

    try {
        console.log(email);
        const usuario = await UserSchema.findOne({email: email});

        if(!usuario) {
            return res.status(404).json({
                ok: false,
                msg: "Usuario no encontrado"
            })
        }

        const validPassword = bcrypt.compareSync(password, usuario.password);
        if(!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: "Contraseña no válida"
            })
        }

        const token = await generarJWT(usuario.id);
        res.json({
            ok:true,
            usuario,
            token
        })

    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Error de servidor'
        })
    }



}

const renewToken = async (req, res = response) => {

    const uuid = req.uuid;
    
    try {
        const usuario = await UserSchema.findById(uuid);

        if(!usuario) {
            return res.status(404).json({
                ok: false,
                msg: "Usuario no encontrado"
            })
        }

        const token = await generarJWT(usuario.id);

        res.json({
            ok:true,
            usuario,
            token
        })

    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Error de servidor'
        })
    }

}

module.exports = {
    crearUsuario,
    login,
    renewToken
}