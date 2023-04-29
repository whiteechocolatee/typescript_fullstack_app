const express = require('express');
const {
  login,
  register,
  current,
} = require('../controllers/users');
const router = express.Router();

// login
router.post('/login', login);

// register
router.post('/register', register);

// current
router.get('/current', current);

module.exports = router;
