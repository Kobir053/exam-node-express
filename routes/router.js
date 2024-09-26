import express from 'express';
import { createBeeper, deleteBeeperById, getAllBeepers, getBeeperById, getBeepersByStatus, updateStatusById } from '../controllers/beeperController.js';
const router = express.Router();
router.route('/').get(getAllBeepers).post(createBeeper);
router.route('/:id').get(getBeeperById).delete(deleteBeeperById);
router.route('/status/:status').get(getBeepersByStatus);
router.route('/:id/status').put(updateStatusById);
export default router;
