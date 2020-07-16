import { Repository } from './repository';

const DEFAULT_COLLECTION = 'calificaciones';

export class CalificacionRepository extends Repository {
  constructor() {
    super(DEFAULT_COLLECTION);
  }
}
