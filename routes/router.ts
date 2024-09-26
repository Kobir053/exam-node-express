import express, { Router } from 'express';
import { createBeeper, deleteBeeperById, getAllBeepers, getBeeperById } from '../controllers/beeperController.js';
import { idIsRequireMiddleware } from '../middlewares/beeperMiddleware.js';

const router: Router = express.Router();

router.route('/').get(getAllBeepers).post(createBeeper);

router.route('/:id').get(getBeeperById).delete(deleteBeeperById);

export default router;