import type { Request, Response } from 'express';
import { userService } from '../services/user.service';

export const userController = {
    getUsers: async (req: Request, res: Response) => {
        try {
            const data = await userService.getAllUsers();
            res.status(200).json({ message: 'Success', data: data });
        } catch (error: any) {
            res.status(500).json({ message: error.message || 'Error server' });
        }
    },

  // Create User
    createUser: async (req: Request, res: Response) => {
        try {
            // Get new value from Thunder client
            const { email, password, full_name } = req.body;
            
            // Inject password to parameter password_hash of service
            const newUser = await userService.createUser(email, password, full_name);
            
            res.status(201).json({ message: 'Create user success!', data: newUser });
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }
};