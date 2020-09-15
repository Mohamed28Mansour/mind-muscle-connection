const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = new Schema ({
  firstName: String,
  lastName: String,
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
    ref: "Program"
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