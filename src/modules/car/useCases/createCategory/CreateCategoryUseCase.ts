import { inject, injectable } from 'tsyringe'

import { ICategoriesRepository } from '../../repositories/ICategoriesRepository'

interface IRequest {
  name: string
  description: string
}

@injectable()
export class CreateCategoryUseCase {
  constructor(
    @inject('CategoriesRepository')
    private repository: ICategoriesRepository
  ) {}

  async run({ name, description }: IRequest): Promise<void> {
    const existingCategory = await this.repository.findByName(name)

    if (existingCategory) {
      throw new Error('Category already exists')
    }

    this.repository.create({ name, description })
  }
}
