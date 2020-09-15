const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const planSchema = new Schema ({
  planName:  String,
  img: String,
  reps1: String,
  reps2: String,
  reps3: String
})

const Plan = mongoose.model('Plan', planSchema)
module.exports = Plan;