const express = require('express');
const app = express();


const isempty = (details) => {
    let error = [];
    for (let key in details) {
        if (details[key] != 'undefined') {
            if (details[key] != '') {
            }
            else {
                error.push('Value of ' + key + ' cannot be left empty ');
            }

        }
        else
            error.push('Error');
    }
    return error;

}

const isnumeric = (details) => {
    if (!details.match(/^\d+/)) {
        return details+'is an invalid value';
    }
    else
        return false;

};




const isemail = (details) => {
    let reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    if (reg.test(details) == true) {
        return false;
    }
    else
        return 'Invalid Email ID';
};

const isalphabetic=(details) =>{
    let reg=/^[A-Za-z ]*$/;
    if (reg.test(details)==true) {
        return false;
    }
    else
        return  details + 'is an invalid value';
};


module.exports = { isempty, isnumeric, isemail ,isalphabetic}