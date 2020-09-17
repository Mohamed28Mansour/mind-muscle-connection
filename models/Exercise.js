const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const exerciseSchema = new Schema ({
  exerciseName:  String,
  img: String,
  reps1: String,
  reps2: String,
  reps3: String,
  weight: {
    type: Number,
    default: 0
  }
})

const Exercise = mongoose.model('Exercise', exerciseSchema)
module.exports = Exercise;