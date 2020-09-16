const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const planSchema = new Schema ({
  title: String,
  day1:  [
    {
    type: Schema.Types.ObjectId,
    ref: "Exercise"
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