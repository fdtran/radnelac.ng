const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Event = require('./models/event.js');
const { User, comparePasswords } = require('./models/user.js');
var jwt = require('jwt-simple');
var handler = require('./request-handler.js');

var port = process.env.PORT || 8000;

var app = express();

mongoose.connect('mongodb://localhost/calendar');

app.use(bodyParser.json());
app.use(express.static(__dirname + '/../public'));

app.get('/api/event', function(request,response) {
  Event.find({}, function(err, data){
    if(err) console.log('Error: ', err);
    else response.send(data);
  })
});

app.post('/api/event', function(request,response) {
  var event = new Event(request.body);
  event.save();
});

app.post('/api/user/signin', function(request, response) {
  var user = new User(request.body);
  User.findOne({username: user.username}, function(err, data) {
    if (!data) {
      response.send('User not found');
      response.end();
    } else {
      comparePasswords(user.password, data.password, function(err, success) {
        if (err) return err;
        if (success) {
          var token = jwt.encode(data, 'secret');
          response.json({token: token});
        } else {
          response.send('Invalid Password');
          response.end();
        }
      });
    }
  })
});

app.post('/api/delete', function(request,response) {
  var event = request.body;
  Event.findByIdAndRemove(event._id, function(err) {
    if(err) console.log(err);
    response.send('Successfully removed event');
  });
});

app.post('/api/user/signup', function(request, response) {
  var user = new User(request.body);
  user.save();
  response.send(user);
});

app.listen(port, () => {
  console.log(`Server is listening at ${port}`);
});

module.exports = app;