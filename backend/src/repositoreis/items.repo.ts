import { pool } from '../config/database';
import { Item } from '../models/item.interface';

export const itemsRepo = {
    
    findAll: async () => {
        // await: WAIT Database return data
        const result = await pool.query('SELECT * FROM items');
        return result.rows;
    },

    addItem: async (itemData: Item) => {

        const addAnItemsQuery = `
            INSERT INTO items (code, name, description, price, category, quantity, inventory_status, rating)
            SELECT $1::text, $2, $3, $4, $5, $6, $7, $8
            WHERE NOT EXISTS (
                -- Đoạn này đi check xem mã code đã nằm trong DB chưa
                SELECT 1 FROM items WHERE code = $1
            )
            RETURNING *;
        `;

        const values = [
            itemData.code, 
            itemData.name, 
            itemData.description, 
            itemData.price, 
            itemData.category, 
            itemData.quantity, 
            itemData.inventory_status, 
            itemData.rating
        ]

        const result = await pool.query(addAnItemsQuery, values);

        if (!result.rows[0]) {
            throw new Error(`This code '${itemData.code}' is exist!`);
        }

        return result.rows[0];
    }
}