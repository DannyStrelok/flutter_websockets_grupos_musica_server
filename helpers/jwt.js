
const jwt = require('jsonwebtoken');

const generarJWT = (uuid) => {

    return new Promise((resolve, reject) => {
        const payload = { uuid }
        jwt.sign(payload, process.env.JWT_SECRET_KEY, {
            expiresIn: '12h'
        }, (err, token) => {
            if(err) {
                // ERROR AL CREAR EL TOKEN
                reject('ERROR AL GENERAR EL JWT')
            } else {
                resolve(token)
            }
    
        })
    })

}

const checkJWT = (token = '') => {
    try {
        const {uuid} = jwt.verify(token, process.env.JWT_SECRET_KEY);    
        return [true, uuid];
    } catch (error) {
        return [false];
    }
}

module.exports = {
    generarJWT,
    checkJWT
}