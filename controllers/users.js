const { response } = require("express");
const UserSchema = require("../models/user");

const getUsers = async (req, res = response) => {

    const from = Number(req.query.from) || 0;

  const allUsers = await UserSchema.find({ _id: { $ne: req.uuid } }).sort(
    "-online"
  ).skip(from).limit(20)

  res.json({
    ok: true,
    users: allUsers
});
};

module.exports = {
  getUsers,
};
