import { Router } from 'express'
import multer from 'multer'

import { createCategoryController } from '../modules/car/useCases/createCategory'
import { listCategoriesController } from '../modules/car/useCases/listCategories'
import { importCategoryController } from '../modules/car/useCases/importCategory'

const categoriesRoutes = Router()

const upload = multer({
  dest: './tmp',
})

categoriesRoutes.post('/', (request, response) =>
  createCategoryController.handle(request, response)
)

categoriesRoutes.get('/', (request, response) =>
  listCategoriesController.handle(request, response)
)

categoriesRoutes.post('/import', upload.single('file'), (request, response) =>
  importCategoryController.handle(request, response)
)

export { categoriesRoutes }
