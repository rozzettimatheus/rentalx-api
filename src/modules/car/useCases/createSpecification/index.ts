import { SpecificationsRepository } from '../../repositories/implementations/SpecificationsRepository'
import { CreateSpecificationController } from './CreateSpecificationController'
import { CreateSpecificationUseCase } from './CreateSpecificationUseCase'

const repository = SpecificationsRepository.getInstance()
const createSpecificationUseCase = new CreateSpecificationUseCase(repository)
const createSpecificationController = new CreateSpecificationController(
  createSpecificationUseCase
)

export { createSpecificationController }
