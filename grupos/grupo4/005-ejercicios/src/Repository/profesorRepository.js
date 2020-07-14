import { Repository } from './repository';

const DEFAULT_COLLECTION = 'profesores';

export class ProfesorRepository extends Repository {
  constructor() {
    super(DEFAULT_COLLECTION);
  }
}
