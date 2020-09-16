const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const exerciseSchema = new Schema ({
  exerciseName:  String,
  img: String,
  reps1: String,
  reps2: String,
  reps3: String
})

const Exercise = mongoose.model('Exercise', exerciseSchema)
module.exports = Exercise;