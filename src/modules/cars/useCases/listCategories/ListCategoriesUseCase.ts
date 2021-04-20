import { injectable, inject } from 'tsyringe'

import { Category } from '@modules/cars/infra/typeorm/entities/Category'
import { ICategoriesRepository } from '@modules/cars/repositories/ICategoriesRepository'

@injectable()
export class ListCategoriesUseCase {
  constructor(
    @inject('CategoriesRepository') private repository: ICategoriesRepository
  ) {}

  async run(): Promise<Category[]> {
    const categories = await this.repository.list()

    return categories
  }
}
