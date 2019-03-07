// const jwt = require('jsonwebtoken');
// const config=require('../config');
const connection=require('../connection');



function showAll(req,res){
    connection.query('select * from products',(err,result)=>{
        if(err){console.log(err);}
        else
        res.send(result);
    }  )
}

function showByCategory(req,res){
    category=req.body.category;
 connection.query('select * from products where category=?',[category],(err,result)=>{
if (err) {
    res.send('error');
    
}
res.send(result);

 })
}

function priceInc(req,res){
    connection.query('select * from products ORDER BY price ',(err,result)=>{
        if(err){console.log(err);}
        else
        res.send(result);
    } )
}

function priceDes(req,res){
    connection.query('select * from products ORDER BY price desc',(err,result)=>{
        if(err){console.log(err);}
        else
        res.send(result);
    } )
}

function categoryInc(req,res){
    category=req.body.category;
    connection.query('select * from products where category=? ORDER BY price desc',[category],(err,result)=>{
        if(err)res.send('ERROR');
        res,send(result);
    })
}

function categoryDes(req,res){
    category=req.body.category;
    connection.query('select * from products  where category=? ORDER BY price',[category],(err,result)=>{
        if(err)res.send('ERROR');
        res,send(result);
    })
}

module.exports={
    showAll,showByCategory,priceDes,priceInc,categoryDes,categoryInc
}