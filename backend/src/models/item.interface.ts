
export interface Item {
    code: string;
    name: string;
    description: string;
    price: number;
    category: string;
    quantity: number;
    rating: number;
    inventory_status?: string;
}