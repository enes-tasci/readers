// IMPORT LIBRARY
const express = require("express");
const router = express();

// IMPORT FILES
const userController = require("../controlller/user");
const auth = require("../middleware/authControl");
const csrf = require("../middleware/csrf");

// PAGES
router.post("/kitap-listesi/:slug", auth.isNotAuth, userController.book_details_post);

router.get("/kitap-listesi/:slug", csrf, auth.isNotAuth, userController.book_details_get);

router.get("/kitap-listesi", auth.isNotAuth, userController.book_list_get);

router.post("/kitap-ekle", auth.isNotAuth, userController.book_add_post);

router.get("/kitap-ekle", csrf, auth.isNotAuth, userController.book_add_get);

router.post("/profil", auth.isNotAuth, userController.profile_post);

router.get("/profil", csrf, auth.isNotAuth, userController.profile_get);

router.get("/", userController.home_get);

module.exports = router;