const UserSchema = require('../models/user');


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

module.exports = {
    userConnected,
    userDisconnected
}