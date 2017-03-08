var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var userSchema = mongoose.Schema({
  username: {type: String, required: true, unique: true},
  password: {type: String, required: true}
});

var comparePasswords = function (candidatePassword, savedPassword, cb) {
  bcrypt.compare(candidatePassword, savedPassword, function (err, isMatch) {
    if (err) {
      console.log(candidatePassword, savedPassword, err);
    } else {
      cb(err, isMatch);
    }
  });
};

userSchema.pre('save', function (next) {
  var user = this;
  if (!user.isModified('password')) {
    return next();
  }
  bcrypt.hash(user.password, null, null, function (err, hash) {
    if (err) return next(err);
    user.password = hash;
    next();
  });
});

module.exports = {
  User: mongoose.model('User', userSchema),
  comparePasswords: comparePasswords
};
