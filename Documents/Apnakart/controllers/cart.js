const cartModal = require('../modals/cart');
const validatecart=require('../validation/validatecart');

exports.doAdd = (req, res) => {
    let details = { ...req.body };
    let error = validatecart.addcartvalidation(details);

    if (error.length > 0) {
        res.send(error);
    }
    else{
        cartModal.doAdd(req, res);
    }
    
}
exports.doUpdate = (req, res) => {
    let details = { ...req.body };
    let error = validatecart.updatecartvalidation(details);


    if (error.length > 0) {
        res.send(error);
    }
    cartModal.doUpdate(req, res);

}
exports.doDelete = (req, res) => {
    let details = { ...req.body };
    let error = validatecart.deletecartvalidation(details);

    if (error.length > 0) {
        res.send(error);
    }
    cartModal.doDelete(req, res);

}
exports.doCheckout = (req, res) => {
    cartModal.doCheckout(req, res);

}