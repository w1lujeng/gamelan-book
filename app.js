var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var flash = require("connect-flash");
var passport = require("passport");
var LocalStrategy = require("passport-local");
var methodOverride = require("method-override");
var Group = require("./models/group");
var Event = require("./models/event");
var User = require("./models/user");
var seedDB = require("./seeds");


// REQUIRE ROUTES
var eventRoutes = require("./routes/events");
var groupRoutes = require("./routes/groups");
var indexRoutes = require("./routes/index");

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/gamelanbook", {useMongoClient: true});
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());
// seedDB();

// PASSPORT CONFIG
app.use(require("express-session")({
  secret: "Bronze Basher",
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
  res.locals.currentUser = req.user;
  res.locals.error = req.flash("error");
  res.locals.success = req.flash("success");
  next();
});
 
app.use("/", indexRoutes);
app.use("/groups", groupRoutes);
app.use("/groups/:id/events", eventRoutes);


app.listen(3000, function(){
  console.log("Gamelan Book has started");
});
