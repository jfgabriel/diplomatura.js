import express from 'express';
import materiasController from '../controllers/materiasController';

const router = express.Router();

router.route('/').post(materiasController.create).get(materiasController.index);

router
  .route('/:id')
  .get(materiasController.display)
  .put(materiasController.update)
  .delete(materiasController.destroy);

export default router;
