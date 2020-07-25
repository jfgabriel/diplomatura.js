import express from 'express';
import calificacionesController from '../controllers/calificacionesController';

const router = express.Router();

router
  .route('/')
  .post(calificacionesController.create)
  .get(calificacionesController.index);

router
  .route('/:id')
  .get(calificacionesController.display)
  .put(calificacionesController.update)
  .delete(calificacionesController.destroy);

export default router;
