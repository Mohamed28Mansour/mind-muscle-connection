const express = require('express');
const router  = express.Router();
const {loginCheck} = require('./middleware')

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index', {user: req.user});
});

router.get('/dashboard', loginCheck(), (req, res) => {
  res.render('dashboard');
})

module.exports = router;
