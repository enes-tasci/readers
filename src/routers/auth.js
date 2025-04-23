// IMPORT LIBRARY
const express = require("express");
const router = express();

//IMPORT FILES
const authController = require("../controlller/auth");

// PAGES
router.get("/cikis-yap", authController.logout);

router.get("/giris-yap", authController.login_get);

router.post("/giris-yap", authController.login_post);

router.get("/kayit-ol", authController.signup_get);

router.post("/kayit-ol", authController.signup_post);

module.exports = router;