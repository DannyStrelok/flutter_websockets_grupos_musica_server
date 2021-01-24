const jwt = require('jsonwebtoken');

const validarJWT = (req, res, next) => {
    const token = req.header('Authorization');

    console.log(token);
    if(!token) {
        return res.status(401).json({
            ok: false,
            msg: 'Token requerido'
        })
    }

    try {

        const {uuid} = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.uuid = uuid;
        
        next();

    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Token inválido'
        })
    }

}

module.exports = {
    validarJWT
}