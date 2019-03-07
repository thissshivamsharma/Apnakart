const connection=require('../connection');
function doAdd(req, res) {
    let user_id = req.data.id;

    let product_id = req.body.product_id;

    let quantity = req.body.quantity;
    connection.query('select * from products where product_id=? ', [product_id], (err, result) => {
        if (err) {
            console.log('error');
        }
        else {
            if (result.length > 0 && (result[0].availability > quantity)) {
                let seller_id = result[0].seller_id;
                let product_name = result[0].product_name;
                let category = result[0].category;
                let price = result[0].price;
                let total = quantity * price;
                connection.query('INSERT INTO `cartinfo`( `user_id`,`seller_id`, `product_id`,`product_name`,`category` ,`quantity`, `price`, `total` ) \
            VALUES (?,?,?,?,?,?,?,?)', [user_id, seller_id, product_id, product_name, category, quantity, price, total], (err, result) => {
                        if (err)
                            console.log('error aayaya hai');
                        else
                            res.send('added to cart');
                    });
            }
            else {
                if(result.length<0)
                res.send('seller does not have that product');
                res.send('That much quantity is not availibe,Please go for less quantity ');
            }
        }

    })


}

function doUpdate(req, res) {
    let user_id = req.data.id;
    let product_id = req.body.product_id;
    let quantity = req.body.quantity;

    connection.query('select * from cartinfo where product_id=? and user_id=?', [product_id, user_id], (err, result) => {
        if (err)
            console.log('error');
        else {
            if(result.length>0){
                let price = result[0].price;
                let total = price * quantity;
                connection.query('UPDATE `cartinfo` SET `quantity`=? \
                ,`total`=? WHERE product_id=? and user_id=?', [quantity, total, product_id, user_id], (err, result) => {
                        if (err)
                            console.log('error');
                        else
                            res.send('done');
                    }
                ) 
            }
            else
            {
                res.send('No such product exist');
            }

            
        }
        //console.log(result[0].original_price);
    });


}

function doDelete(req, res) {
    let user_id = req.data.id;
    let product_id = req.body.product_id;

    connection.query('select * from cartinfo where product_id=? and user_id=?', [product_id, user_id], (err, result) => {
        if (err)
            console.log('error');
        else {
            if(result.length>0){
    connection.query('DELETE FROM `cartinfo` WHERE product_id=? and user_id=?', [product_id, user_id], (err, result) => {
        if (err)
            console.log('error');
        else
            res.send('done');
    })
}
else{
    res.send('No such product exist inside the cart')
}
}
    })
}


function doCheckout(req, res) {
    let user_id = req.data.id;

    let promo_code = req.body.promo_code;
    connection.query('select * from cartinfo where user_id=?', [user_id], (err, result) => {
        if (err) { console.log('something went wrong') }
        else {
            if (result.length > 0) {
                connection.query('insert into `orders`(user_id) values (?)', [user_id], (err, resu) => {
                    if (err)
                        console.log('something went wrong inside');
                    else {
                        connection.query('select * from `orders` where user_id=?', [user_id], (err, re) => {
                            if (err)
                                console.log('something went wrong again');
                            else {
                                order_id = re[0].order_id;
                                connection.query('select * from promocode where promo_code=?', [promo_code], (e, r) => {
                                    if (e) console.log(error)
                                    else {

                                        let promo_code = r[0].promo_code;
                                        let discount = r[0].discount;
                                        let i = result.length;
                                        for(let j=0;j<i;j++) {
                                            let product_id = result[j].product_id;
                                            let seller_id = result[j].seller_id;
                                            let product_name = result[j].product_name;
                                            let quantity = result[j].quantity;
                                            let original_price = result[j].price;
                                            let final_price = original_price - ((original_price * discount) / 100)
                                            connection.query('INSERT INTO `orderhistory`( `user_id`,`order_id`,`seller_id`,`product_id`, `product_name`, `quantity`, `original_price`,`discount`,`final_price`,`coupun`) \
                    values(?,?,?,?,?,?,?,?,?,?)', [user_id, order_id, seller_id, product_id, product_name, quantity, original_price, discount, final_price, promo_code], (err, result) => {
                                                    if (err) { console.log(err) }
                                                })
                                        }
                                        res.send('Thanks for shoping with us');
                                        

                                    }
                                })
                            }
                        })

                    }

                })
            }
            else {
                console.log('Please add something inside cart before checking out');
            }

        }
    })

}

module.exports = {
    doAdd, doCheckout, doDelete, doUpdate
}