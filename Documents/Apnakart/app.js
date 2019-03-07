let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let bodyparser=require('body-parser');
let _ = require('lodash');

let app = express();
let config=require('./config');
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
let mysql=require('mysql');
let myConnection = require('express-myconnection');
    
let dbOptions = {
      host:  config.database.host,
      user:  config.database.user,
      password:  config.database.password,
      port:  config.database.port,
      database:  config.database.db
    }

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//let productRouter=require('./Routes/product_r');


app.use(myConnection(mysql, dbOptions, 'pool'));

let userRouter = require('./routes/user');
let sellerRouter = require('./routes/seller');
let cartRouter = require('./routes/cart');
let productRouter=require('./routes/product');



app.use('/user', userRouter);
app.use('/seller', sellerRouter);
app.use('/cart',cartRouter);
app.use('/products',productRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
app.listen(2019,()=>{
  console.log('success');
})
//  module.exports = connection;
