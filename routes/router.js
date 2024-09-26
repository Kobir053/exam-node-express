import express from 'express';
import { createBeeper } from '../controllers/beeperController.js';
const router = express.Router();
router.route('/').post(createBeeper);
// router.route('/:id').get().delete();
export default router;
