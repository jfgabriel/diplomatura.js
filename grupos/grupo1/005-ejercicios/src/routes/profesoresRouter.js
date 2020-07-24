import express from 'express';
import profesoresController from '../controllers/profesoresController';

const router = express.Router();

router
  .route('/')
  .post(profesoresController.create)
  .get(profesoresController.index);

router
  .route('/:id')
  .get(profesoresController.display)
  .put(profesoresController.update)
  .delete(profesoresController.destroy);

export default router;
