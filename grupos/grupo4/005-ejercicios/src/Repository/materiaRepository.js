import { Repository } from './repository';

const DEFAULT_COLLECTION = 'materias';

export class MateriaRepository extends Repository {
  constructor() {
    super(DEFAULT_COLLECTION);
  }
}
