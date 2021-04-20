import { ICreateCategoryDTO } from '@modules/cars/dtos/ICreateCategoryDTO'
import { Category } from '@modules/cars/infra/typeorm/entities/Category'

import { ICategoriesRepository } from '../ICategoriesRepository'

export class CategoriesRepositoryMock implements ICategoriesRepository {
  private categories: Array<Category> = []

  async create({ description, name }: ICreateCategoryDTO): Promise<void> {
    const category = new Category()

    Object.assign(category, {
      description,
      name,
    })

    this.categories.push(category)
  }

  async list(): Promise<Category[]> {
    return this.categories
  }

  async findByName(name: string): Promise<Category> {
    return this.categories.find(category => category.name === name)
  }
}
