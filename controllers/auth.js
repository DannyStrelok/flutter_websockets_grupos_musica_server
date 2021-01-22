const { response } = require("express")
const { validationResult } = require("express-validator")

const UserSchema = require('../models/user');

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
        await usuario.save();

        res.json({
            ok:true,
            usuario
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error 500'
        })
    }
    
    
}

module.exports = {
    crearUsuario
}