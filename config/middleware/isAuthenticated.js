//A Middleware for restricting routes a user is not allowed to visit if not logged in

module.export = (req, res, next) => {
    //If a user is already logged in, then continue with the request to the restricted route
    if (req.user) {
        return next();
    }
    //if the user isn't logged in, then redirect them to the login page
    return res.redirect("/");
};