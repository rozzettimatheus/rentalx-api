import { Router } from 'express'

import { createCategoryController } from '../modules/car/useCases/createCategory'
import { listCategoriesController } from '../modules/car/useCases/listCategories'

const categoriesRoutes = Router()

categoriesRoutes.post('/', (request, response) =>
  createCategoryController.handle(request, response)
)

categoriesRoutes.get('/', (request, response) =>
  listCategoriesController.handle(request, response)
)

export { categoriesRoutes }
