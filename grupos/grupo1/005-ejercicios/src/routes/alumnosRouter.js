import express from 'express';
import alumnosController from '../controllers/alumnosController';

const router = express.Router();

router.route('/').post(alumnosController.create).get(alumnosController.index);

router
  .route('/:id')
  .get(alumnosController.display)
  .put(alumnosController.update)
  .delete(alumnosController.destroy);

export default router;
