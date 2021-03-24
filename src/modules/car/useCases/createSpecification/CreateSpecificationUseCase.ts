import { ISpecificationsRepository } from '../../repositories/ISpecificationsRepository'

interface IRequest {
  name: string
  description: string
}

class CreateSpecificationUseCase {
  constructor(private repository: ISpecificationsRepository) {}

  run({ name, description }: IRequest): void {
    const existingSpecification = this.repository.findByName(name)

    if (existingSpecification) {
      throw new Error('Specification already exists')
    }

    this.repository.create({ name, description })
  }
}

export { CreateSpecificationUseCase }
