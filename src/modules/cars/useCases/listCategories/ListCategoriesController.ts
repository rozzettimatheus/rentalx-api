import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { ListCategoriesUseCase } from './ListCategoriesUseCase'

export class ListCategoriesController {
  async handle(request: Request, response: Response): Promise<Response> {
    const listCategoriesUseCase = container.resolve(ListCategoriesUseCase)
    const allCategories = await listCategoriesUseCase.run()

    return response.json(allCategories)
  }
}
