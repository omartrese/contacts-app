const sql = require('mysql2');

const sqldb = sql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'mypassword',
    database: 'contactsapp'
})

sqldb.connect((error) => {
    if(error) throw error;

    console.log("connected succesfully");
})

module.exports = sqldb;