import pg from 'pg';
import dotenv from 'dotenv';

const { Pool } = pg;

// Request system read file .env and get login information
dotenv.config();

// Pool keep connet alive
export const pool = new Pool({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '5432'),
    database: process.env.DB_NAME,
});

// check when we start server, connection is good
pool.connect((err: any, client: any, release: any) => {
    if (err) {
        return console.error('❌ Error to connect Database', err.message);
    }
    console.log('✅ Connet with PostgreSQL success!');
    release(); 
});
