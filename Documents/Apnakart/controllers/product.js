const productmodal = require('../modals/product');


exports.showByCategory = (req, res) => {
    productmodal.showByCategory(req, res);
}

exports.priceInc = (req, res) => {
    productmodal.priceInc(req, res);

}

exports.priceDes = (req, res) => {
    productmodal.priceDes(req, res);
}

exports.showAll = (req, res) => {
    productmodal.showAll(req, res);
}

exports.categoryInc = (req, res) => {
    productmodal.categoryInc(req, res);
}

exports.categoryDes = (req, res) => {
    productmodal.categoryDes(req, res);
}