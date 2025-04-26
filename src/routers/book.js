const bookController = require("../controlller/book");
const auth = require("../middleware/authControl");
const csrf = require("../middleware/csrf");
const { router } = require("./user");

router.get("/kitap-listesi/:status", auth.isNotAuth, bookController.book_filter_get);

router.post("/kitap/:slug", auth.isNotAuth, bookController.book_details_post);

router.get("/kitap/:slug", auth.isNotAuth, csrf, bookController.book_details_get);

router.get("/kitap-listesi", auth.isNotAuth, bookController.book_list_get);

router.post("/kitap-ekle", auth.isNotAuth, bookController.book_add_post);

router.get("/kitap-ekle", auth.isNotAuth, csrf, bookController.book_add_get);

module.exports = router;