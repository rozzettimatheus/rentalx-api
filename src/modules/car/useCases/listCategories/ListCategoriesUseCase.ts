import { Category } from '../../model/Category'
import { ICategoriesRepository } from '../../repositories/ICategoriesRepository'

class ListCategoriesUseCase {
  constructor(private repository: ICategoriesRepository) {}

  run(): Category[] {
    return this.repository.list()
  }
}

export { ListCategoriesUseCase }
