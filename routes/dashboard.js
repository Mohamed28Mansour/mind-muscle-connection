const express = require('express');
const router  = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const passport = require('passport');
const Plan = require('../models/Plan');
const Exercise = require('../models/Exercise');



router.get('/dashboard', (req, res, next) => {
  User.findById(req.user._id).populate("programs")
  .then(user => {
    if(req.user.role == "Trainer") {
      res.render('dashboard/trainer', {user: user});
    } else if(req.user.role == "Trainee") {
      res.render('dashboard/trainee', {user: user});
    }
  })
});

router.get('/plan/day1', (req, res, next) => {
  res.render('dashboard/plans');
});

router.get('/plan/day2', (req, res, next) => {
  res.render('dashboard/plans2');
});

router.get('/plan/day3', (req, res, next) => {
  res.render('dashboard/plans3');
});

router.post('/plan/day1', async (req, res, next) => {
  const {planName, exercises, reps1, reps2} = req.body;
  let exerciseArr = await exercises.map((exercise,index) => {
    return {
      exerciseName:  exercise,
      reps1: reps1[index],
      reps2: reps2[index],
    }
  })
  
  let createdExercises = await Exercise.insertMany(exerciseArr)
  let exerciseIds = createdExercises.map(exer => exer._id);
  Plan.create({
    title: planName,
    day1: exerciseIds
  }).then(plan => {
    res.redirect('/plan/day2')
  }).catch(err => console.log(err)
  )
})

router.post('/plan/day2', async (req, res, next) => {
  const {planName, exercises, reps1, reps2} = req.body;
  let exerciseArr = await exercises.map((exercise,index) => {
    return {
      exerciseName:  exercise,
      reps1: reps1[index],
      reps2: reps2[index],
    }
  })

  let createdExercises = await Exercise.insertMany(exerciseArr)
  let exerciseIds = createdExercises.map(exer => exer._id);

  Plan.findOneAndUpdate({title: planName}, {
    day2: exerciseIds
  }).then(plan => {
    res.redirect('/plan/day3')
  }).catch(err => console.log(err))
})

router.post('/plan/day3', async (req, res, next) => {
  const {planName, exercises, reps1, reps2} = req.body;
  let exerciseArr = await exercises.map((exercise,index) => {
    return {
      exerciseName:  exercise,
      reps1: reps1[index],
      reps2: reps2[index],
    }
  })

  let createdExercises = await Exercise.insertMany(exerciseArr)
  let exerciseIds = createdExercises.map(exer => exer._id);
  Plan.findOneAndUpdate({title: planName}, {
    day3: exerciseIds
  }).then(plan => {
    res.redirect('/dashboard')
  }).catch(err => console.log(err))
})


module.exports = router;
