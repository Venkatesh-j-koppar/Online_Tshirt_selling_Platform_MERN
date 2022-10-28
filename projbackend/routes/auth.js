var express = require("express");
const { check, validationResult } = require("express-validator");
var router = express();
const { signout, signup, signin } = require("../controllers/auth");

router.post(
  "/signup",
  [
    check("name")
      .isLength({ min: 3 })
      .withMessage("Name Should be atlest 3 letter"),

    check("email").isEmail().withMessage("Email should be a valid one"),

    check("password")
      .isLength({ min: 5 })
      .withMessage("Password should be greater than 5 character"),
  ],
  signup
);

router.post(
  "/signin",
  [
    check("email").isEmail().withMessage("Email is required"),

    check("password")
      .isLength({ min: 5 })
      .withMessage("password field is required"),
  ],
  signin
);
router.get("/signout", signout);

module.exports = router;
