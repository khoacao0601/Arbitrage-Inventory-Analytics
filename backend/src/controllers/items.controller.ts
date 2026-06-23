import { Request, Response } from 'express';
import { itemsService } from "../services/items.service";
import { Item } from '../models/item.interface';

export const ItemsController = {

    getItems: async (req: Request, res: Response) => {
        try {
            const data = await itemsService.getAllItem();
            res.status(200).json({ message: 'Success', data: data})
        } catch (error: any) {
            res.status(500).json({ message: error.message || 'Error Server'})
        }
    },

    addAnItem: async(req: Request, res: Response) => {
        try {
            const itemData = req.body as Item;

            const newItems = await itemsService.addAnItems(itemData);

            res.status(201).json({ message: 'Create item success!', data: newItems });
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }
}