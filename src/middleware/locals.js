module.exports = (req,res,next) => {
    res.locals.isAuth = req.session.isAuth;
    res.locals.username = req.session.username;
    res.locals.name = req.session.name;
    res.locals.activeLink = req.path;
    next();
};