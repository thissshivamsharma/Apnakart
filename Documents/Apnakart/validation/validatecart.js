const generalvalidation=require('../validation/generalvalidation');

const addcartvalidation=(details)=>{

    let error =generalvalidation.isempty(details);

    if(generalvalidation.isnumeric(details.product_id)== false){}
    else
    error.push(generalvalidation.isnumeric(details.product_id));

    if(generalvalidation.isnumeric(details.quantity)== false){}
    else
    error.push(generalvalidation.isnumeric(details.quantity));


 if(generalvalidation.isalphabetic(details.product_name)== false){}
    // else
    // error.push(generalvalidation.isalphabetic(details.product_name));

    return error;


};
const updatecartvalidation=(details)=>{
    let error =generalvalidation.isempty(details);

    if(generalvalidation.isnumeric(details.product_id)== false){}
    else
    error.push(generalvalidation.isnumeric(details.product_id));

    if(generalvalidation.isnumeric(details.quantity)== false){}
    else
    error.push(generalvalidation.isnumeric(details.quantity));

    return error;

};
const deletecartvalidation=(details)=>{
    let error =generalvalidation.isempty(details);

    if(generalvalidation.isnumeric(details.product_id)== false){}
    else
    error.push(generalvalidation.isnumeric(details.product_id));

    return error;
};

module.exports={
    addcartvalidation,updatecartvalidation,deletecartvalidation
}