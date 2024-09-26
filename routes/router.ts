import express, { Router } from 'express';
import { createBeeper } from '../controllers/beeperController.js';

const router: Router = express.Router();

router.route('/').post(createBeeper);

// router.route('/:id').get().delete();

export default router;