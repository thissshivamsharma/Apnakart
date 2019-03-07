let express = require('express');
let app = new express();
let router = express.Router();
let validatecart = require('../validation/validatecart');
const verifytoken = require('../jwt/verifytoken');
const mail = require('../mail');
const cartController=require('../controllers/cart');

//adding products to cart API
router.post('/add', verifytoken.verifytoken,cartController.doAdd );


//updating products in cart API
router.post('/update', verifytoken.verifytoken,cartController.doUpdate );


//deleting 
router.delete('/delete', verifytoken.verifytoken,cartController.doDelete);



router.post('/checkout', verifytoken.verifytoken,cartController.doCheckout);


module.exports = router;