var authMiddleware = {
    authcheck: (req, res,next) => {
        if (req.session.login) {
            res.locals.login = req.session.login;
            next();
        }else {
            res.redirect('/login');
        }
    }
}
module.exports=authMiddleware;