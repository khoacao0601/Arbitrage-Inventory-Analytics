import { userRepository } from '../repositoreis/user.repo';

export const userService = {
    getAllUsers: async () => {
        return await userRepository.findAll();
    },


    createUser: async (email: string, password_hash: string, full_name: string) => {
        // Validation email
        if (!email || !email.includes('@')) {
            throw new Error('Email not legit!');
        }
        
        // Temporary we keep original not hash
        return await userRepository.create({ email, password_hash, full_name });
    }
};