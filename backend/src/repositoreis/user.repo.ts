import { pool } from '../config/database';

export const userRepository = {

    findAll: async () => {
        // await: WAIT Database return data
        const result = await pool.query('SELECT * FROM users');
        return result.rows; // rows is array from Users
    },

    create: async (userData: { email: string; password_hash: string; full_name: string }) => {
        // RETURNING * mean return new data
        const query = `
            INSERT INTO users (email, password_hash, full_name)
            VALUES ($1, $2, $3)
            RETURNING *;
        `;
        // $1, $2, $3 the way to prevent from SQL Injection
        const values = [userData.email, userData.password_hash, userData.full_name];
        
        const result = await pool.query(query, values);
        return result.rows[0]; 
    }
}