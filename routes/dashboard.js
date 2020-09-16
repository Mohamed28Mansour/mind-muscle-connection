const express = require('express');
const router  = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const passport = require('passport');
const Plan = require('../models/Plan');
const Exercise = require('../models/Exercise');



router.get('/dashboard', async (req, res, next) => {
  User.findById(req.user._id).populate("programs")
  .then(user => {
    // let plans = await Plan.find();
    if(req.user.role == "Trainer") {
      console.log(user)
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
    User.findByIdAndUpdate(req.user._id, {$push: {programs: plan._id}}).then(user => { //adding id of the created plan for the users

      res.redirect('/plan/day2')
    })
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

router.post('/trainee', (req, res, next) => {
  User.findByIdAndUpdate(req.user._id,
    {
      gender: req.body.gender,
      level: req.body.level},
      {new: true})
      .then(user => console.log(user))
      .catch(err => next(err))
})

router.get('/program/:id', (req, res, next)=>{
  console.log(req.params.id);
  const id = req.params.id;
  Plan.findById(id).populate('day1').populate('day2').populate('day3')
  .then(planInfo => {
    res.render('dashboard/showPlan',{planInfo})
  })
  .catch(err => {
    next(err)
  })
})

module.exports = router;
