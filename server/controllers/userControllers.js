const User = require("../models/userModels");
const bcrypt = require("bcrypt");

module.exports.getAllUsers = async (req, res, next) => {
  try {
    const user = await User.find({ _id: { $ne: req.params.id } }).select([
      "email",
      "username",
      "avatarImage",
      "_id",
    ])

    return res.json(user);
  } catch (err) {
    next(err);
  }
};

module.exports.login = async (req, res, next) => {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({username:username})
      
      if(!user)
      return res.json({ msg: "Incorrect Username or Password", status: false });
      const checkPassword= await bcrypt.compare(password,user.password)
      if(!checkPassword)
      return res.json({ msg: "Incorrect Username or Password", status: false });

      delete user.password;
      return res.json({ status: true, user });
    } catch (err) {
      next(err);
    }
};


module.exports.register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    const usernameCheck = await User.findOne({ username });
    if (usernameCheck)
      return res.json({ msg: "Username already used", status: false });
    const emailCheck = await User.findOne({ email });
    if (emailCheck)
      return res.json({ msg: "Email already used", status: false });

    const hashPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      username,
      email,
      password: hashPassword,
    });
    delete user.password
    return res.json({ status: true, user });
  } catch (err) {
    next(err);
  }
};


module.exports.setavatar = async (req, res, next) => {
  try {
    const id = req.params.id
    const avatarImage = req.body.image
    const user = await User.findOneAndUpdate({ _id:id},{
      isAvatarImageSet: true,
      avatarImage
    })

    return res.json({ status: true , user });
  } catch (err) {
    next(err);
  }
};
