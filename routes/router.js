import express from 'express';
import { createBeeper, deleteBeeperById, getAllBeepers, getBeeperById } from '../controllers/beeperController.js';
const router = express.Router();
router.route('/').get(getAllBeepers).post(createBeeper);
router.route('/:id').get(getBeeperById).delete(deleteBeeperById);
export default router;
