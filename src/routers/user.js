// IMPORT LIBRARY
const express = require("express");
const router = express();

// IMPORT FILES
const userController = require("../controlller/user");

// PAGES
router.get("/", userController.home_get);

module.exports = router;