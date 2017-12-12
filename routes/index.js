var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");
var middleware = require("../middleware");



//=============== ROOT ROUTE ================
router.get("/", function(req, res){
  res.render("landing");
});


// ============ AUTH ROUTES =======
// ============= REGISTER FORM =====
router.get("/register", function(req,res){
  res.render("register");
});

// ============== CREATE NEW USER =====
router.post("/register", function(req,res){
  var newUser = new User({username: req.body.username});
  User.register(newUser, req.body.password, function(err,user){
    if(err){
      req.flash("error", err.message);
      return res.render("register");
    } 
    passport.authenticate("local")(req,res,function(){
      req.flash("success", "Welcome to GamelanBook "+ user.username);
      res.redirect("/groups")
    });
  });
});

// ============ LOGIN ROUTES =======

// =========== LOGIN FORM
router.get("/login", function(req,res){
  res.render("login");
})

// =========== SUBMIT LOGIN
router.post("/login", passport.authenticate("local", 
{

  successRedirect: "/groups",
  failureRedirect: "/login"
}), function(req,res){
});

//============ LOGOUT ROUTE ==========
router.get("/logout", function(req, res){
  req.logout();
  req.flash("success", "Successfully logged out");
  res.redirect("/");
});


module.exports = router;