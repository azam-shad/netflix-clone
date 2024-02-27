// const Pool = require('pg').Pool;


// // PostgreSQL connection pool
// const pool = new Pool({
//     user: 'postgres',
//     host: 'localhost',
//     database: 'netflix',
//     password: 'root',
//     port: 5432, // Default PostgreSQL port
// })


// // After creating the pool
// pool.on('connect', () => {
//     console.log('Connected to the database');
// });

// // https://netflix-clone-q429.onrender.com
// // http://localhost:5000

// module.exports = pool;



const path = require('path');
const { Pool } = require('pg');
require('dotenv').config();

const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD } = process.env;

// PostgreSQL connection pool
const pool = new Pool({
    user: PGUSER,
    host: PGHOST,
    database: PGDATABASE,
    password: PGPASSWORD,
    port: 5432, // Default PostgreSQL port
    ssl: {
        rejectUnauthorized: false, // for self-signed certificates
    },
    // sslmode: 'require' // Ensure SSL is required
});

// Handle errors
pool.on('error', (err, client) => {
    console.error('Unexpected error on idle client', err);
    process.exit(-1);
});

async function getPgVersion() {
    try {
        const result = await pool.query('SELECT version()');
        console.log(result.rows[0]);
    } catch (error) {
        console.error('Error fetching client from pool', error);
    }
}

getPgVersion();

module.exports = pool;