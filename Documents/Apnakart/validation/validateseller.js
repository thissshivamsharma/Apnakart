let generalvalidation=require('../validation/generalvalidation');


const loginvalidation=(details) =>{

    let error =generalvalidation.isempty(details);
    return error;
    

};
const signupvalidation=(details)=>{
   
    let error =generalvalidation.isempty(details);

    if(generalvalidation.isalphabetic(details.seller_name)== false){}
    else
    error.push(generalvalidation.isalphabetic(details.phone));

    if(generalvalidation.isnumeric(details.phone)== false){}
    else
    error.push(generalvalidation.isnumeric(details.phone));

    if(generalvalidation.isemail(details.email)== false){}
    else
    error.push(generalvalidation.isemail(details.email));

    return error;

};

const productaddvalidation=(details)=>{

    let error = generalvalidation.isempty(details);

    if(generalvalidation.isalphabetic(details.product_name)== false){}
    else
    error.push(generalvalidation.isalphabetic(details.product_name));

    if(generalvalidation.isnumeric(details.price)== false){}
    else
    error.push(generalvalidation.isnumeric(details.price));

    if(generalvalidation.isnumeric(details.availability)== false){}
    else
    error.push(generalvalidation.isnumeric(details.availability));

    return error;


};

const productdelete=(details)=>{

    let error =generalvalidation.isempty(details);

    if(generalvalidation.isnumeric(details.product_id)== false){}
    else
    error.push(generalvalidation.isnumeric(details.product_id));



    return error;
};

const productupdate=(details)=>{

    let error =generalvalidation.isempty(details);

    if(generalvalidation.isnumeric(details.original_price)== false){}
    else
    error.push(generalvalidation.isnumeric(details.original_price));

    if(generalvalidation.isnumeric(details.availability)== false){}
    else
    error.push(generalvalidation.isnumeric(details.availability));

    if(generalvalidation.isnumeric(details.product_id)== false){}
    else
    error.push(generalvalidation.isnumeric(details.product_id));


    
    return error;


};
 

module.exports={loginvalidation,signupvalidation,productaddvalidation,productdelete,productupdate};