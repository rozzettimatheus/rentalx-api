import { getRepository, Repository } from 'typeorm'

import { ICreateCategoryDTO } from '@modules/cars/dtos/ICreateCategoryDTO'
import { ICategoriesRepository } from '@modules/cars/repositories/ICategoriesRepository'

import { Category } from '../entities/Category'

export class CategoriesRepository implements ICategoriesRepository {
  private repository: Repository<Category>

  constructor() {
    this.repository = getRepository(Category)
  }

  async create({ description, name }: ICreateCategoryDTO): Promise<void> {
    const category = this.repository.create({
      description,
      name,
    })

    await this.repository.save(category)
  }

  async list(): Promise<Category[]> {
    return this.repository.find()
  }

  async findByName(name: string): Promise<Category> {
    return this.repository.findOne({
      where: {
        name,
      },
    })
  }
}
