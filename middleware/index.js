var Group = require("../models/group");
var Event = require("../models/event");

var middlewareObj = {}


middlewareObj.checkGroupOwnership = function(req, res, next){
  if(req.isAuthenticated()){
    Group.findById(req.params.id, function(err, foundGroup){
      if(err){
        req.flash("error", "Group Not Found");
        res.redirect("back");
      } else {
        if(foundGroup.author.id.equals(req.user._id)){
          next();
        } else {
          req.flash("error", "You don't have permission to do that");
          res.redirect("back");
        }
      }
    }); 
  } else {
    req.flash("error", "You need be logged in to do that");
    res.redirect("/login");
  }
}

middlewareObj.checkEventOwnership = function(req, res, next){
  if(req.isAuthenticated()){
    Event.findById(req.params.event_id, function(err, foundEvent){
      if(err){
        req.flash("error", "Event Not Found");
        res.redirect("back");
      } else {
        if(foundEvent.author.id.equals(req.user._id)){
          next();
        } else {
          req.flash("error", "You don't have permission to do that");
          res.redirect("back");
        }
      }
    }); 
  } else {
    req.flash("error", "You need be logged in to do that");
    res.redirect("/login");
  }
}

middlewareObj.isLoggedIn = function(req, res, next){
  if(req.isAuthenticated()){
    return next();
  }
  req.flash("error", "You need to be logged in to do that!");
  res.redirect("/login");
}






module.exports = middlewareObj;