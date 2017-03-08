var mongoose = require('mongoose');

var eventSchema = mongoose.Schema({
  name: String,
  description: String,
  username: String,
  date: String,
  time: String
});

module.exports = mongoose.model('Event', eventSchema);
