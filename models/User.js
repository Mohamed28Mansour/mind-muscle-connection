const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = new Schema ({
  username: String,
  password: String,
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
  exercises: [
    {
      id: {
      type: Schema.Types.ObjectId,
      ref: "Exercise"
      },
      weight: Number,
      repetition: Number
    }
  ],
})

const User = mongoose.model('User', userSchema)
module.exports = User;