let express = require('express');
let router = express.Router();
const userController = require('../controllers/user');

//user login API
router.post('/login',userController.doLogin);

//user signup API
router.post('/signup',userController.doSignup );

//userwantstoaddaddress
router.post('/addAddress',userController.addAddress);

module.exports = router;
