const userController = {};

const User = require("../models/User");

userController.create = async (req, res) => {
  const user = await User.findOne({ email: req.body.email })

  if (!user) {
    const newUser = await User.create({email: req.body.email})
    res.send(newUser)
  } else {
    res.json({message: 'User already Exists~!~!~!'}).send();
  }
}

userController.verify = async (req, res) => {
  const user = await User.findOne({ verificationCode: req.query.code })

  if (!user) {
    res.json({message: 'Invalid code'}).send()
  } else {
    const newUser = await User.findByIdAndUpdate(
      user._id,
      {
        $unset: {
          verificationCode: 1,
        },
        $set: {
          isVerified: true,
        },
      },
      { new: true },
    );
    res.send(newUser);
  }
}

module.exports = userController;
