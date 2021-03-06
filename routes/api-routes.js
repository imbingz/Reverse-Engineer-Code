//Require Models and Passport
const db = require("../models");
const passport = require("../config/passport");

//Export Modules 

module.exports = app => {
    //Use passport authentication middleware with localStrategy
    app.post("/api/login", passport.authenticate("local"), (req, res) => {
        res.json(req.user);
    });
  
    //Route for signing up a user. User password is hashed automatically and stored securely
    //Configure Sequalize User Model. If the user is created successfully, log in user, otherwise, send back an error 

    app.post("/api/signup", (req, res) => {
        db.User.create({
            email: req.body.email,
            password: req.body.password
        })
            .then(() => {
                res.redirect(307, "/api/login");
            })
            .catch(err => res.status(401).json(err));
    });
  
  
    //Route for logging user out 
    app.get("/logout", (req, res) => {
        // passport has logout() method that can be called from any route handler which needs to terminate a login session. Invoking logout() will remove the req.user property and clear the login session (if any).
        req.logout();
        res.redirect("/");
    });


    //Route for getting user data to be used to render member page after sign up and login 
    //If user is no logged in, send back an empty object
    //Otherwise, send back the user email and id. 
    app.get("/api/user_data", (req, res) => {
        console.log(req.user);
        if (!req.user) {
            res.json({});
        } else {
            res.json({
                email: req.user.email,
                id: req.user.id
            });
        }
    });
};