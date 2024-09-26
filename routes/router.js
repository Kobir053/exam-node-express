import express from 'express';
import { createBeeper, deleteBeeperById, getAllBeepers, getBeeperById, getBeepersByStatus } from '../controllers/beeperController.js';
const router = express.Router();
router.route('/').get(getAllBeepers).post(createBeeper);
router.route('/:id').get(getBeeperById).delete(deleteBeeperById);
router.route('/status/:status').get(getBeepersByStatus);
export default router;
