const express = require('express');
const router  = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const passport = require('passport');




router.get('/dashboard', (req, res, next) => {
  console.log(req.user.role)
  if(req.user.role == "trainer") {
  res.render('dashboard/trainer', {user: req.user});
  }
});


module.exports = router;
