const validateseller = require('../validation/validateseller');
const sellerModal = require('../modals/seller');

exports.doLogin = (req, res) => {

  let details = { ...req.body };
  let error = validateseller.loginvalidation(details);
  if (error.length > 0) {
    res.send(error);
  }
  else {
    sellerModal.doLogin(req, res);
  }

}

exports.doSignup = (req, res) => {

  let details = { ...req.body };
  let error = validateseller.signupvalidation(details);
  if (error.length > 0) {
    res.send(error);
  }
  else {
    sellerModal.doSignup(req, res);
  }

}

exports.doProductAdd = (req, res) => {
  let details = { ...req.body };
  let error = validateseller.productaddvalidation(details);

  if (error.length > 0) {
    res.send(error);
  }
  else {
    sellerModal.doProductAdd(req,res);
  }
}

exports.doProductDelete = (req, res) => {

  let details = { ...req.body };
  let error = validateseller.productdelete(details);

  if (error.length > 0) {
    res.send(error);
  }
  else {
    sellerModal.doProductDelete(req, res);
  }
}

exports.doProductUpdate = (req, res) => {

  let details = { ...req.body };
  let error = validateseller.productupdate(details);

  if (error.length > 0) {
    res.send(error);
  }
  else {
    sellerModal.doProductUpdate(req, res);
  }
}

exports.viewProducts =(req,res)=>{

  sellerModal.viewProducts(req,res);

}
