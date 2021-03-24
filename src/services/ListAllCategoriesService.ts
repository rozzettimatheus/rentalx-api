import { Category } from '../model/Category'
import { ICategoriesRepository } from '../repositories/ICategoriesRepository'

class ListAllCategoriesService {
  constructor(private repository: ICategoriesRepository) {}

  run(): Category[] {
    return this.repository.list()
  }
}

export { ListAllCategoriesService }
