require('dotenv').config();
const Pool = require('pg').Pool;


const pool = new Pool({
    user: "postgres",
    password: process.env.PASSWORD,
    host: process.env.HOST,
    port: process.env.DBPORT,
    // user: "postgres",
    // password: "sathiya",
    // host: "localhost",
    // port: 5432,
    database: 'goalapp'
})

module.exports = pool;