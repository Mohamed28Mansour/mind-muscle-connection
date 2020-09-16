const express = require('express');
const router  = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const passport = require('passport');
const Plan = require('../models/Plan')



router.get('/dashboard', (req, res, next) => {
  console.log(req.user.role)
  if(req.user.role == "Trainer") {
    res.render('dashboard/trainer', {user: req.user});
  } else {
    res.render('dashboard/trainee', {user: req.user});
  }
});

router.get('/plans', (req, res, next) => {
  res.render('dashboard/plans');
});

router.post('/plans', (req, res, next) => {
  const {planName, reps1, reps2, reps3} = req.body;
  Plan.create({
    planName: planName,
    reps1: reps1,
    reps2: reps2,
    reps3: reps3
  })
  .then(dbPlan => {
    res.redirect('/dashboard')
  }).catch(err => {
    next(err)
  })
})  

router.get('/program/:id', (req, res, next)=>{
  console.log(req.params.id);
  const id = req.params.id;
  Plan.findById(id).populate('exercise')
  .then(planInfo => {
    console.log(planInfo);
    res.render('dashboard/showPlan', planInfo)
  })
  .catch(err => {
    next(err)
  })
})

module.exports = router;
