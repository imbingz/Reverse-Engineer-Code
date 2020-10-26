
//Import path module to set relative routes for HTML file 
const path = require("path");

//Require customo middleware for cheking if a user is logged in
const isAuthenticated = require("../config/middleware/isAuthenticated");

//Export the module 
module.exports = app => {

    app.get("/", (req, res) => {
        if (req.user) {
            res.redirect("members");
        }
        res.sendFile(path.join(__dirname, "../public/signup.html"));
    });
  
    app.get("/login", (req, res) => {
        if (req.user) {
            res.redirect("/members");
        }
        res.sendFile(path.join(__dirname, "../public/login.html"));
    });
  
    app.get("/members", isAuthenticated, (req, res) => {
        res.sendFile(path.join(__dirname, "../public/members.html"));
    });
};

