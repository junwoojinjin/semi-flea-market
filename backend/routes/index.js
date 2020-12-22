var express = require('express');
var router = express.Router();
var multer = require('multer');
const upload = multer({dest:'./product_img/'})

const {
  computeUserLogin,
  computeUserRegister,
  checkUserID,
  getUsers,
  deleteUserByID,
  ChangeUserByID
} = require('./login');

const {
  saveImg,
  getProducts,
  getProductByID,
  computeProductBuy,
  computeProductWish,
  getMyProductByID,
  deleteMyProductByID,
  editProductByID,
  getPurchListByID,
  getWishListByID,
  
} = require('./product')

router.post('/login',computeUserLogin);
router.post('/register',computeUserRegister);
router.post('/checkID',checkUserID);
router.post('/register-product',upload.single('image'),saveImg);
router.post('/products',getProducts);
router.post('/product-detail',getProductByID);
router.post('/product-buy',computeProductBuy);
router.post('/product-wish',computeProductWish);
router.post('/getMyProductByID',getMyProductByID);
router.post('/deleteMyProductByID',deleteMyProductByID);
router.post('/edit-product',editProductByID);
router.post('/getMyPurchaseListByID',getPurchListByID);
router.post('/getWishListByID',getWishListByID);

router.post('/getUsers',getUsers);
router.post('/deleteUserByID',deleteUserByID);
router.post('/ChangeUserByID',ChangeUserByID);
module.exports = router;
 