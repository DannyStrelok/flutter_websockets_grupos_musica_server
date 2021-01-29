const UserSchema = require('../models/user');
const MensajeSchema = require('../models/mensaje');


const userConnected = async (uuid = '') => {

    const user = await UserSchema.findById(uuid);
    user.online = true;
    await user.save();
    return user;

}

const userDisconnected = async (uuid = '') => {

    const user = await UserSchema.findById(uuid);
    user.online = false;
    await user.save();
    return user;

}

const saveMessage = async (payload) => {

    /**
     * {
     * from: '',
     * to: '',
     * message: ''
     * }
     */

    try {
        const mensaje = new MensajeSchema(payload);
        console.log('mensaje')
        const resp = await mensaje.save();
        console.log(resp);

        return true;
    } catch (error) {
        return false;
    }

}

module.exports = {
    userConnected,
    userDisconnected,
    saveMessage
}