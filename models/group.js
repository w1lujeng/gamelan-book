var mongoose = require("mongoose");


var groupSchema = new mongoose.Schema({
  name: String,
  image: String,
  genre: String,
  author: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    username: String
  },
  events: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event"
    }
  ]
});


module.exports = mongoose.model("Group", groupSchema);