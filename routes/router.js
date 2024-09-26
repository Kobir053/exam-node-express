import express from 'express';
import { createBeeper, getAllBeepers } from '../controllers/beeperController.js';
const router = express.Router();
router.route('/').get(getAllBeepers).post(createBeeper);
// router.route('/:id').get().delete();
export default router;
