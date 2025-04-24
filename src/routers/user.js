// IMPORT LIBRARY
const express = require("express");
const router = express();

// IMPORT FILES
const userController = require("../controlller/user");
const auth = require("../middleware/authControl");

// PAGES
router.get("/profil", auth.isNotAuth, userController.profile_get);

router.get("/", userController.home_get);

module.exports = router;