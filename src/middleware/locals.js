module.exports = (req,res,next) => {
    res.locals.isAuth = req.session.isAuth;
    res.locals.username = req.session.username;
    next();
};