var express = require("express");
var router = express.Router();
var Group = require("../models/group");
var middleware = require("../middleware");


//INDEX ROUTE - see all groups
router.get("/", function(req,res){
  Group.find({}, function(err, allGroups){
    if(err){
      console.log(err);
    } else {
      res.render("groups/index",{groups:allGroups, currentUser: req.user});
    }
  });
});

// new form submit
router.post("/", middleware.isLoggedIn, function(req, res){
  var name = req.body.name;
  var image = req.body.image;
  var genre = req.body.genre;
  var author = {
    id: req.user._id,
    username: req.user.username
  };
  var newGroup = {name: name, image: image, genre: genre, author: author};

  Group.create(newGroup, function(err, newlyCreated){
    if(err){
      console.log("ERROR");
    } else {
      req.flash("success", "Successfully added an new group");
      res.redirect("/groups");
    }
  }); 
});
// get the new form
router.get("/new", middleware.isLoggedIn, function(req, res){
  res.render("groups/new");
});

// SHOW goes at end
router.get("/:id", function(req, res){
  Group.findById(req.params.id).populate("events").exec(function(err, foundGroup){
    if(err){
      console.log(err);
    } else {
      res.render("groups/show", {group: foundGroup});
    }
  });   
});

router.get("/:id/edit", middleware.checkGroupOwnership, function(req, res){
  Group.findById(req.params.id, function(err, foundGroup){
    res.render("groups/edit", {group: foundGroup});
  });
});


router.put("/:id", middleware.checkGroupOwnership, function(req, res){
  Group.findByIdAndUpdate(req.params.id, req.body.group, function(err, updatedGroup){
    if(err){
      res.redirect("/groups")
    } else {
      req.flash("success", "Successfully edited your group");
      res.redirect("/groups/"+ req.params.id);
    }
  });
});

router.delete("/:id", middleware.checkGroupOwnership, function(req, res){
  Group.findByIdAndRemove(req.params.id, function(err){
    if(err){
      console.log(err);
      res.redirect("/groups")
    } else {
      req.flash("success", "Successfully deleted your group");
      res.redirect("/groups")
    }
  });
});

module.exports = router;