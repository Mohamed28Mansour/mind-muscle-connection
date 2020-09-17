const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = new Schema ({
  username: String,
  password: String,
  level: {
    type: String,
    enum: ['beginner', 'intermediate', 'advance']
  },
  gender: {
    type: String,
    enum: ['female', 'male']
  },
  role: {
    type: String,
    enum: ['Trainer', 'Trainee']
  },
  programs: [
    {
    type: Schema.Types.ObjectId,
    ref: "Plan"
    }
  ],
  userPrograms: [],
})

const User = mongoose.model('User', userSchema)
module.exports = User;