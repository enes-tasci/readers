// IMPORT LIBRARY
const express = require("express");
const router = express();

// IMPORT FILES
const userController = require("../controlller/user");
const auth = require("../middleware/authControl");
const csrf = require("../middleware/csrf");

// PAGES
router.post("/profil", auth.isNotAuth, userController.profile_post);

router.get("/profil", auth.isNotAuth, csrf, userController.profile_get);

router.get("/iletisim", userController.contact_get);

router.get("/hakkinda", userController.about_get);

router.get("/", userController.home_get);

module.exports = router;