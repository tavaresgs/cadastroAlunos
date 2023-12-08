const mysql = require('mysql');

const con = mysql.createConnection ({
    host: 'localhost',
    user: 'root',
    database: 'alunos'
});

module.exports = con;