const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    login: {
      type: String,
      required: true,
      trim: true
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 6,
    },
  })

  userSchema.methods.generateAuthToken = async function () {
    const user = this;
    const token = jwt.sign({ _id: user._id.toString() }, 'ICMCJR');
    return token;
  };

  userSchema.statics.findByCredentials = async (login, password) => {
    const user = await User.findOne({ login });
    if (!user) return undefined;
  
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return undefined;
  
    return user;
  };

  userSchema.pre('save', async function (next) {
    const user = this;
  
    if (user.isModified('password')) {
      user.password = await bcrypt.hash(user.password, 8);
    }
    next();
  });

  const User = mongoose.model('User', userSchema);
  module.exports = User;