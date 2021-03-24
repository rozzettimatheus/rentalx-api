import { Router } from 'express'

// category
import { CategoriesRepository } from '../repositories/CategoriesRepository'
import { CreateCategoryService } from '../services/CreateCategoryService'
import { ListAllCategoriesService } from '../services/ListAllCategoriesService'

const categoriesRoutes = Router()
const repository = new CategoriesRepository()
const createCategoryService = new CreateCategoryService(repository)
const listAllCategoriesService = new ListAllCategoriesService(repository)

categoriesRoutes.post('/', (req, res) => {
  const { name, description } = req.body

  try {
    createCategoryService.run({ name, description })
  } catch (err) {
    return res.status(400).json({ error: err.message })
  }

  return res.status(201).send()
})

categoriesRoutes.get('/', (req, res) => {
  const listAll = listAllCategoriesService.run()

  return res.json(listAll)
})

export { categoriesRoutes }
