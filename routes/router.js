import express from 'express';
import { createBeeper, getAllBeepers, getBeeperById } from '../controllers/beeperController.js';
import { idIsRequireMiddleware } from '../middlewares/beeperMiddleware.js';
const router = express.Router();
router.route('/').get(getAllBeepers).post(createBeeper);
router.route('/:id').get(idIsRequireMiddleware, getBeeperById);
export default router;
