const msysql = require('mysql');

// connection pool - reuses database connection

const pool = mysql.createPool({
    connectionLimit: 10,
    host: '',
    user:'',
    password:'',
    database: '',
});

// Function for SQL queries

