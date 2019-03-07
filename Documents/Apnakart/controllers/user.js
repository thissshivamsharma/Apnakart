const userModal = require('../modals/user');
const validateuser = require('../validation/validateuser');

exports.doLogin = (req, res) => {
  let details = { ...req.body };
  let error = [];
  error = validateuser.loginvalidation(details);
  if (error.length > 0) {
    res.send(error);
  }
  else {
    userModal.doLogin(req, res);
  }
}

exports.doSignup = (req, res) => {

  let details = { ...req.body };

  let error = [];

  error = validateuser.signupvalidation(details);
  if (error.length > 0) {
    res.send(error);
  }
  else {
    userModal.doSignup(req, res);
  }  

}

// exports.addAddress=(req,res)=>{

//   userModal.addAddress(req,res);

// }
