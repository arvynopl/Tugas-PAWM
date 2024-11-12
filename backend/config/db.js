const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'tugaspawm',
    password: 'qwertyuiop1234567890',
    port: 5432
});

// Add error handling
pool.on('connect', () => {
    console.log('Database connected successfully');
});

pool.on('error', (err) => {
    console.error('Unexpected error on idle client', err);
    process.exit(-1);
});

// Test connection
const testConnection = async () => {
    try {
        const client = await pool.connect();
        console.log('Database connection test successful');
        const result = await client.query('SELECT NOW()');
        console.log('Database query test successful:', result.rows[0]);
        client.release();
    } catch (err) {
        console.error('Database connection test failed:', err);
    }
};

testConnection();

module.exports = pool;