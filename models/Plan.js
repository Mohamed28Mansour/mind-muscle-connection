const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const planSchema = new Schema ({
  title: String,
  day1:  [
    {
    exerciseName:  String,
    img: String,
    reps1: String,
    reps2: String,
    reps3: String,
    weight: {
      type: Number,
      default: 0
    }
  }
  ],
  day2:  [
    {
    type: Schema.Types.ObjectId,
    ref: "Exercise"
    }
  ],
  day3:  [
    {
    type: Schema.Types.ObjectId,
    ref: "Exercise"
    }
  ],
})

const Plan = mongoose.model('Plan', planSchema)
module.exports = Plan;