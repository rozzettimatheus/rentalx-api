import { inject, injectable } from 'tsyringe'

import { ISpecificationsRepository } from '../../repositories/ISpecificationsRepository'

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
      throw new Error('Specification already exists')
    }

    await this.repository.create({ name, description })
  }
}
