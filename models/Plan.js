const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const planSchema = new Schema ({
  name = String,
  img = String,
  reps = Number,
})

const Plan = mongoose.model('Plan', planSchema)
module.exports = Plan;