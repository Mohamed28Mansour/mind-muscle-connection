const express = require('express');
const router  = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const passport = require('passport');


router.get('/signup', (req, res, next) => {
  res.render('auth/signup');
});







module.exports = router;
