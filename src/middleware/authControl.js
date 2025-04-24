exports.isAuth = (req,res,next) => {
    if(req.session.isAuth) return res.redirect("/");
    next();
};
exports.isNotAuth = (req,res,next) => {
    if(!req.session.isAuth) return res.redirect("/giris-yap");
    next();
};