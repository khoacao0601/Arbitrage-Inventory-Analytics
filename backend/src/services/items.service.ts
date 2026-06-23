import { Item } from "../models/item.interface";
import { itemsRepo } from "../repositoreis/items.repo";

export const itemsService = {
    getAllItem: async () => {
            return await itemsRepo.findAll();
    },

    addAnItems: async (item: Item) => {
        return await itemsRepo.addItem(item);
    }
}