var express = require("express");
var router = express.Router({mergeParams: true});
var Group = require("../models/group");
var Event = require("../models/event");
var middleware = require("../middleware");


// ==================== EVENT NEW ===================
router.get("/new", middleware.isLoggedIn, function(req, res){
  Group.findById(req.params.id, function(err, group){
    if(err){
      console.log(err)
    } else {
      res.render("events/new", {group: group});    
    }
  });
});

// ================== EVENT CREATE ==================
router.post("/", middleware.isLoggedIn, function(req, res){
  Group.findById(req.params.id, function(err, group){
    if(err){
      req.flash("error", "Oops, something went wrong");
      console.log(err);
      res.redirect("/groups");
    } else {
      Event.create(req.body.event, function(err, event){
        if(err){
          console.log(err);
        } else {
          event.author.id = req.user._id;
          event.author.username = req.user.username;
          event.save();
          group.events.push(event);
          group.save();
          req.flash("success", "Successfully created an event");
          res.redirect("/groups/" + group._id);
        }
      });
    }
  });
});

// ================== EDIT ========

router.get("/:event_id/edit", middleware.checkEventOwnership, function(req, res){
  Event.findById(req.params.event_id, function(err, foundEvent){
    if(err){
      res.redirect(back)
    } else {
      
      res.render("events/edit", {group_id: req.params.id, event: foundEvent});
    }
  });
});

router.put("/:event_id", middleware.checkEventOwnership, function(req, res){
  Event.findByIdAndUpdate(req.params.event_id, req.body.event, function(err, updatedEvent){
    if(err){
      res.redirect("back");
    } else {
      req.flash("success", "Successfully edited an event");
      res.redirect("/groups/"+ req.params.id);
    }
  });
}); 

//====================== DESTROY ======================
router.delete("/:event_id", middleware.checkEventOwnership, function(req, res){
  Event.findByIdAndRemove(req.params.event_id, function(err){
    if(err){
      res.redirect("back")
    } else {
      req.flash("success", "Successfully deleted an event");
      res.redirect("/groups/" + req.params.id)
    }
  });
});

module.exports = router;