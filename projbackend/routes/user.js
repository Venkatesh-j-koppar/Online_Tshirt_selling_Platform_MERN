const express = require("express");
const router = express();

const {
  getUserById,
  getUser,
  updateUser,
  userPurchaseList,
} = require("../controllers/user");
const { isAdmin, isAuthenticated, isSignedIn } = require("../controllers/auth");

router.param("userId", getUserById);

// User Route
router.get("/user/:userId", isSignedIn, isAuthenticated, getUser);
router.put("/user/:userId", isSignedIn, isAuthenticated, updateUser);

// Order Route
router.put("/orders/user/:userId", isSignedIn, isAuthenticated, userPurchaseList);

router.put(
  "/orders/user/:userId",
  isSignedIn,
  isAuthenticated,
  userPurchaseList
);

module.exports = router;
