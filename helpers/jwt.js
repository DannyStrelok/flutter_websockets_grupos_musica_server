
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

module.exports = {
    generarJWT
}