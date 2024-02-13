const Pool = require('pg').Pool;


// PostgreSQL connection pool
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'netflix',
    password: 'root',
    port: 5432, // Default PostgreSQL port
})


// After creating the pool
pool.on('connect', () => {
    console.log('Connected to the database');
});


module.exports = pool;