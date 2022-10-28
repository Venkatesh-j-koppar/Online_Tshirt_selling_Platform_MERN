const { validationResult } = require("express-validator");
const User = require("../models/user");

exports.signup = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    return res.status(422).json({
      error: errors.array()[0].msg,
      errormsg: errors.array()[0].param,
    });
  }

  const user = new User(req.body);
  user.save((err, user) => {
    if (err) {
      return res.send(400).json({
        err: "NOT able to save user to DB ",
      });
    } else {
      res.json({
        name: user.name,
        email: user.email,
        id: user._id,
      });
    }
  });
};

exports.signout = (req, res) => {
  res.json({
    message: "User signout",
  });
};
