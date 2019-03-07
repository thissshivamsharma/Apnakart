const jwt = require('jsonwebtoken');
const config = require('../config');
const mail = require('../mail');
const connection=require('../connection');


function doLogin(req, res) {
  let user_name = req.body.user_name;
  let password = req.body.password;
  connection.query('select * from userinfo where user_name=? and password=?', [user_name, password], (err, result) => {
        if (err)
          console.log('error');
        else {
          if (result.length > 0) {
            user_id = result[0].user_id;
            email = result[0].email;
            jwt.sign({ id: user_id, email: email }, config.secretkey, { expiresIn: 60 * 60 }, (err, token) => {
              if (err) res.send(error);
              connection.query('UPDATE `userinfo` SET `token`=? WHERE `user_name`=? and `password`=?', [token, user_name, password], (err, result) => {
                if (err)
                  console.log('error');
                else {
                  res.send({
                    statuscode: 200,
                    message: 'Success',
                    result: {
                      username: user_name,
                      email: email,
                      token: token
                    }
                  })
                }
              })
            })
          }
          else
            res.send({ result, status: 'failure', statuscode: 400, message: 'Invalid Credentials' });
        }
      })
  
    }
  




function doSignup(req, res) {
  let user_name = req.body.user_name;
  let email = req.body.email;
  let password = req.body.password;
  let phone = req.body.phone;

  let details = { ...req.body };

      connection.query('select * from userinfo where email=? and phone =?', [email, phone], (err, result) => {
        if (err) {
          console.log('error')
        }
        else {
          if (result.length == 0) {
            //Token generation  and signing up
            jwt.sign({ user_name: user_name }, config.secretkey, { expiresIn: 60 * 60 }, (err, token) => {
              if (err)
                console.log('unable to create token');
              else {
                console.log('token created');
                connection.query('INSERT INTO `userinfo`( `user_name`, `email`, `password`, `phone`,`token`)\
                    VALUES (?,?,?,?,?)', [user_name, email, password, phone, token], (err, result) => {
                    if (err)
                      console.log('error');
                    else {
                      res.send({
                        statuscode: 200,
                        message: 'Success',
                        result: {
                          username: user_name,
                          email: email,
                          token: token
                        }

                      })
                      mail.mailing("/public/mailtemplates/welcome.ejs", details);
                    }
                    //send mail to user about signing up on the app

                  });
              }

            });
          }
          else {
            res.send({
              statuscode: 403,
              message: 'Data already exist',
              result: {
                username: user_name,
                email: email,
                phone: phone
              }
            })
          }
        }

      })
    



  };

  // function addAddress(req,res){

  //   let user_id = req.data.user_id;
  //   connection.query()

  // }

module.exports = { doLogin, doSignup }