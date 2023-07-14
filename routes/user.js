const express = require('express');
const router = express.Router();
const {
  getUser,
  userSignUp,
  loginUser,
  loginUserWithGoogle,
  logoutUser,
} = require('../Controllers/User');

router.route('/signup').post(userSignUp);
router.route('/login').post(loginUser);
router.route('/login/google').get(loginUserWithGoogle);
router.route('/logoutUser').post(logoutUser);
router.route('/getUser/:email').get(getUser);

module.exports = router;
