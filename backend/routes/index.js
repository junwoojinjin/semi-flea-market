var express = require('express');
var router = express.Router();
// 비밀번호는 별도의 파일로 분리해서 버전관리에 포함시키지 않아야 합니다. 

 


const {
  computeUserLogin,
  computeUserRegister
} = require('./login');

router.post('/login',computeUserLogin);
router.post('/register',computeUserRegister);

module.exports = router;
