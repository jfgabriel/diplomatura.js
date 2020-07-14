import { Repository } from './repository';

const DEFAULT_COLLECTION = 'alumnos';

export class AlumnoRepository extends Repository {
  constructor() {
    super(DEFAULT_COLLECTION);
  }
}
