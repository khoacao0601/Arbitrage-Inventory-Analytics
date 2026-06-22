import { Router } from 'express';
import { userController } from '../controllers/user.controller';

const router = Router();

// anyone try to access to this path '/' (of users) by method GET, 
// give it for userController.getUsers to process
router.get('/', userController.getUsers);

//  request POST go to '/', call createUser
router.post('/', userController.createUser);

export default router;