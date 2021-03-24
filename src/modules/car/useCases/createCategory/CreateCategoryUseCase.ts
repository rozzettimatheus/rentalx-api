import { ICategoriesRepository } from '../../repositories/ICategoriesRepository'

interface IRequest {
  name: string
  description: string
}

class CreateCategoryUseCase {
  constructor(private repository: ICategoriesRepository) {}

  run({ name, description }: IRequest): void {
    const existingCategory = this.repository.findByName(name)

    if (existingCategory) {
      throw new Error('Category already exists')
    }

    this.repository.create({ name, description })
  }
}

export { CreateCategoryUseCase }
