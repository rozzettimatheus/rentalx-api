import { CategoriesRepository } from '../../repositories/implementations/CategoriesRepository'
import { ListCategoriesController } from './ListCategoriesController'
import { ListCategoriesUseCase } from './ListCategoriesUseCase'

const repository = CategoriesRepository.getInstance()
const listCategoriesUseCase = new ListCategoriesUseCase(repository)
const listCategoriesController = new ListCategoriesController(
  listCategoriesUseCase
)

export { listCategoriesController }
