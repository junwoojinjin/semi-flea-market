var express = require('express');
var router = express.Router();
 
const {
  computeUserLogin,
  computeUserRegister,
  checkUserID
} = require('./login');

router.post('/login',computeUserLogin);
router.post('/register',computeUserRegister);
router.post('/checkID',checkUserID);

module.exports = router;
 