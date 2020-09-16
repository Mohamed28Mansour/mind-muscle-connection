const express = require('express');
const router  = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const passport = require('passport');
const Plan = require('../models/Plan');
const flash = require('connect-flash')

router.get('/signup', (req, res, next) => {
  res.render('auth/signup');
});

router.get('/login', (req, res, next) => {
  res.render('auth/login', {message: req.flash("error")});
});

router.post('/signup', (req, res, next) => {

  const { username, password, role } = req.body;

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
          password: hash,
          role: role
        })
          .then(dbUser => {
            res.redirect('/login');
          })
      }
    })
})



// router.post('/login', (req, res, next) => {
//   const {username, password} = req.body;
//   User.findOne({username:username})
//   .then(found => {
//     console.log('this is fiund',found.role)
//     if(found === null) {
//       res.render('auth/login', {message: 'Invalid Credentials'});
//     }
//      if (bcrypt.compareSync(password, found.password)){
//       if (found.role == 'Trainer'){
//         res.redirect('/dashboard/trainer')
//       } else 
//       if (found.role == 'Trainee'){
//         res.redirect('/dashboard/trainee')
//       }
//     } else {
//       res.render('auth/login', {message: 'Invalid Credentials'})
//     }
//   })
//   .catch(err => {
//     next(err)
//   })
// });




router.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/login',
    // failureFlash: true,
    passReqToCallback: true
  })
)

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
})

module.exports = router;
