var mongoose = require("mongoose");
var Group = require("./models/group");
var Event = require("./models/event");
var data = [
  {
    image: "https://i.imgur.com/oKh8Mx4.jpg",
    name: "Pandan Arum",
    genre: "Semar Pegulingan"
  },
  {
    image: "https://i.imgur.com/f6CbnKt.jpg",
    name: "Gender Wayang",
    genre: "Gender Wayang"
  },
  {
    image: "https://i.imgur.com/9CYnZx5.jpg",
    name: "Rindik",
    genre: "Rindik"
  }
]


function seedDB(){
  // Remove all groups
  Group.remove({}, function(err){
    if(err){
      console.log(err);
    }
    console.log("removed groups");
  
    // add groups
    data.forEach(function(seed){
      Group.create(seed, function(err, group){
        if(err){
          console.log(err); 
        } else {
          console.log("added group");
          // add events
          Event.create(
            {
              date: "Friday, January 8th",
              location: "CalArts",
              author: "Geoff"
            }, function(err, event){
              if(err){
                console.log(err);
              } else {
                group.events.push(event);
                group.save();
                console.log("created new event")
              }
          });
        }
      });
    });
  });
  // add events
}

module.exports = seedDB;