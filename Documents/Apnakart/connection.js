let config = require('./config');
let mysql = require('mysql');

let connection  = mysql.createConnection({
    host: config.database.host,
    user: config.database.user,
    password: config.database.password,
    port: config.database.port,
    database: config.database.db
})

connection.connect((err,result)=> {

        if (err)
            console.log('connection failed');
        else {
            console.log('connected to the Kart Database');
        }

})

module.exports=connection;