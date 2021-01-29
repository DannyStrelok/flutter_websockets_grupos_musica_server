const MensajeSchema = require('../models/mensaje');

const getChat = async (req, res) => {
    const id = req.uuid;
    const from = req.params.from;

    const lastMessages = await MensajeSchema.find({
        $or: [{ from: id, to: from }, {from: from, to: id}]
    }).sort({
        createdAt: 'desc'
    }).limit(30);

    res.json({
        ok: true,
        id,
        from,
        messages: lastMessages
    });

}

module.exports = {
    getChat
}