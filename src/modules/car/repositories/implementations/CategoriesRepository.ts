import { getRepository, Repository } from 'typeorm'

import { ICreateCategoryDTO } from '../../dtos/ICreateCategoryDTO'
import { Category } from '../../entities/Category'
import { ICategoriesRepository } from '../ICategoriesRepository'

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
    const categories = await this.repository.find()

    return categories
  }

  async findByName(name: string): Promise<Category> {
    const category = this.repository.findOne({
      where: {
        name,
      },
    })

    return category
  }
}
