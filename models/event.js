var mongoose = require("mongoose");


var eventSchema = mongoose.Schema({
  date: String,
  location: String,
  author: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    username: String
  }
});


module.exports = mongoose.model("Event", eventSchema);