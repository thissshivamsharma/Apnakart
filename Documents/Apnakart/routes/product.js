let express = require('express');
let router = express.Router();
const productController = require('../controllers/product');
const verifytoken=require('../jwt/verifytoken');


router.post('/viewByCategory',verifytoken.verifytoken,productController.showByCategory);
router.get('/pricehightolow',verifytoken.verifytoken,productController.priceDes);
router.get('/pricelowtohigh',verifytoken.verifytoken,productController.priceInc);
router.get('/view',verifytoken.verifytoken,productController.showAll);
router.post('/categoryDes',verifytoken.verifytoken,productController.showByCategory);
router.post('/categoryInc',verifytoken.verifytoken,productController.showByCategory);


module.exports=router;
