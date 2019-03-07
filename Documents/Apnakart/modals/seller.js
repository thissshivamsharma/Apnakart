const jwt = require('jsonwebtoken');
const config=require('../config');
const connection=require('../connection');

function doLogin(req,res){
    let seller_name=req.body.seller_name;
    let password=req.body.password;
          connection.query('Select * from sellerinfo where seller_name=? and password=?', [seller_name, password], (err, result) => {
            if (err)
            responses.sendError(error.message, res);
            else {
              if (result.length > 0) {
                seller_id = result[0].seller_id;
                email = result[0].email;
                jwt.sign({ id: seller_id, email: email }, config.secretkey, { expiresIn: 60 * 60 }, (err, token) => {
                  if (err) res.send(error);
                  connection.query('UPDATE `sellerinfo` SET `token`=? WHERE `seller_name`=? and `password`=?', [token, seller_name, password], (err, result) => {
                    if (err)
                    responses.sendError(error.message, res);
                    else {
                      res.send({
                        statuscode: 200,
                        message: 'Success',
                        result: {
                          sellername: seller_name,
                          email: email,
                          token: token
                        }
                      })
                    }
  
                  })
                });
              }
              else
                res.send({
                  statuscode: 403,
                  message: 'Invalid credentials',
                  result: {
                    null:'Null'
                  }
                });
            }
          }
          );
        };

function doSignup(req,res){
    let seller_name = req.body.seller_name;
    let email = req.body.email;
    let password = req.body.password;
    let phone = req.body.phone;
    let shopaddress = req.body.shopaddress;
  
          connection.query('select * from sellerinfo where email=? and phone =?', [email, phone], (err, result) => {
            if (err) {
              console.log('error')
            }
            else {
              if (result.length == 0) {
                //Token generation signup
                jwt.sign({ seller_name: seller_name },config.secretkey, { expiresIn: 60 * 60 }, (err, token) => {
                  if (err)
                    console.log('unable to create token');
                  else {
                    console.log('token created');
                    connection.query('INSERT INTO `sellerinfo`( `seller_name`, `email`, `password`, `phone`, `shopaddress`,`token`)\
                  VALUES (?,?,?,?,?,?)', [seller_name, email, password, phone, shopaddress, token], (err, result) => {
                        if (err)
                          console.log('error');
                        else
                        loadTemplate(welcome,details).then(()=>{
                          res.send({
                            statuscode: 200,
                            message: 'Success',
                            result: {
                              sellername: seller_name,
                              email: email,
                              token: token
                            }
                          })
                        })
                      });
                  }
  
                });
              }
              else {
                res.send({
                  statuscode: 403,
                  message: 'Data already exist',
                  result: {
                    sellername: seller_name,
                    email: email,
                    phone: phone
                  }
                })
              }
            }
  
          })
  
  
  
        }


function doProductAdd(req,res){
    let seller_id = req.data.id;
    let product_name = req.body.product_name;
    let price = req.body.price;
    let category=req.body.category;
    let availability = req.body.availability;
    let description = req.body.description;

    connection.query('INSERT INTO `products`( `seller_id`, `product_name`, `price`,`category`, `availability`,`description`)\
    VALUES (?,?,?,?,?,?)', [seller_id, product_name, price,category ,availability, description], (err, result) => {
          if (err)
            console.log('error');
          else
            res.send({
              statuscode: 200,
              message: 'Success',
              result: {
                productname: product_name,
                price: price,
              }
            })
        });
}

function doProductDelete(req,res){
    let seller_id = req.data.id;
  let product_id = req.body.product_id;
          connection.query('select * from products where seller_id=? and product_id=?', [seller_id, product_id], (err, result) => {
  
            if (err)
              console.log('error');
            else if (result.length > 0) {
              connection.query('DELETE FROM `products` WHERE seller_id=? and product_id=?', [seller_id, product_id], (err, result) => {
                if (err)
                  console.log('error');
                else
                  res.send('done');
              });
            }
            else
              res.send({
                statuscode: 403,
                message: 'Failure',
                result: {
                  Null:"Apna delete karro bhai"
                }
              });
          });
  
        }

function doProductUpdate(req,res){
    let seller_id = req.data.id;
  let product_id = req.body.product_id;
  let price = req.body.price;
  let availability = req.body.availability;

          connection.query('select * from products where seller_id=? and product_id=?', [seller_id, product_id], (err, result) => {
  
            if (err)
              console.log('error');
            else {
              if(result.length > 0)
             {
              connection.query('UPDATE `products` SET `price`=?,`availability`=? WHERE seller_id=? and product_id=?', [price, availability, seller_id, product_id], (err, result) => {
                if (err)
                  console.log('error');
                else
                  res.send({
                    statuscode: 200,
                    message: 'Sucess'
                  });
              });
             }
             else
              res.send({
                statuscode: 403,
                message: 'Failure',
                result: {
                  Null:"Null"
                }
              });
              
            }
            
          });
  
        }
        
        function viewProducts(req,res){
          let seller_id=req.data.id;
          connection.query('select * from `products` where seller_id =?',[seller_id],(err,result)=>{
            if(err)console.log('error in query execution');
            else{
              res.send(result);

            }
          })
        }
  
module.exports = { doLogin, doSignup , doProductAdd, doProductDelete, doProductUpdate ,viewProducts}