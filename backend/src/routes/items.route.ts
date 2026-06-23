import { Router } from 'express';
import { ItemsController } from '../controllers/items.controller';


const router = Router();

router.get('/', ItemsController.getItems);

router.post('/', ItemsController.addAnItem);

export default router;