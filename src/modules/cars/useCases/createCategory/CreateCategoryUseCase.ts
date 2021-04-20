import { inject, injectable } from 'tsyringe'

import { ICategoriesRepository } from '@modules/cars/repositories/ICategoriesRepository'
import { AppError } from '@shared/errors/AppError'

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
      throw new AppError('Category already exists')
    }

    await this.repository.create({ name, description })
  }
}
