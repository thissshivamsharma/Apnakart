const express = require('express');

const router = express.Router();

const multer = require('multer');


const sellerController=require('../controllers/seller');


const verifytoken=require('../jwt/verifytoken');

//const loadTemplate=require('../mail/mail');

//const responses=require('../response/responses');

//const constant=require('../response/constant');

const mail=require('../mail');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/images/')
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString() + file.originalname)
  }
})

const filefilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png')
    cb(null, true);
  else
    cb(error, false)
};

const upload = multer({
  storage: storage, limits: {
    fileSize: 1024 * 1024 * 5
  }, fileFilter: filefilter
})


//login API

router.post('/login',sellerController.doLogin);

//signup API

router.post('/signup',sellerController.doSignup);

//product add API

router.post('/productadd', verifytoken.verifytoken, upload.array('image', 4),sellerController.doProductAdd);

//product delete API

router.delete('/productdelete', verifytoken.verifytoken,sellerController.doProductDelete);

//product update API

router.put('/productupdate', verifytoken.verifytoken,sellerController.doProductUpdate);

//view all your products

router.get('/productview',verifytoken.verifytoken,sellerController.viewProducts);

module.exports = router;    