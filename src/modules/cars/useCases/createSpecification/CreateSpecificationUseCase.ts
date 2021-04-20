import { inject, injectable } from 'tsyringe'

import { ISpecificationsRepository } from '@modules/cars/repositories/ISpecificationsRepository'
import { AppError } from '@shared/errors/AppError'

interface IRequest {
  name: string
  description: string
}

@injectable()
export class CreateSpecificationUseCase {
  constructor(
    @inject('SpecificationsRepository')
    private repository: ISpecificationsRepository
  ) {}

  async run({ name, description }: IRequest): Promise<void> {
    const existingSpecification = await this.repository.findByName(name)

    if (existingSpecification) {
      throw new AppError('Specification already exists')
    }

    await this.repository.create({ name, description })
  }
}
