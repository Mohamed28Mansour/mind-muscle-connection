const express = require('express');
const router  = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const passport = require('passport');


router.get('/signup', (req, res, next) => {
  res.render('auth/signup');
});

router.get('/login', (req, res, next) => {
  res.render('auth/login');
});

router.post('/signup', (req, res, next) => {

  const { username, password } = req.body;

  if (password.length < 8) {
    res.render('auth/signup', { message: 'Your password needs to be 8 chars min' });
    return;
  }
  if (username === '') {
    res.render('auth/signup', { message: 'Your username cannot be empty' });
    return;
  }
  User.findOne({ username: username })
    .then(found => {
      if (found !== null) {
        res.render('auth/signup', { message: 'This username is already taken' });
      } else {
        const salt = bcrypt.genSaltSync();
        const hash = bcrypt.hashSync(password, salt);

        User.create({
          username: username,
          password: hash
        })
          .then(dbUser => {
            res.redirect('/login');
          })
      }
    })
})



module.exports = router;
