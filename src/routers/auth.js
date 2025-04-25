// IMPORT LIBRARY
const express = require("express");
const router = express();

//IMPORT FILES
const authController = require("../controlller/auth");
const auth = require("../middleware/authControl");
const csrf = require("../middleware/csrf");

// PAGES
router.get("/cikis-yap", auth.isNotAuth, authController.logout);

router.get("/giris-yap", auth.isAuth, authController.login_get);

router.post("/giris-yap", auth.isAuth, authController.login_post);

router.get("/kayit-ol", auth.isAuth, authController.signup_get);

router.post("/kayit-ol", auth.isAuth, authController.signup_post);

module.exports = router;