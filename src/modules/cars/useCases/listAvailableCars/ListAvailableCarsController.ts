import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { ListAvailableCarsUseCase } from './ListAvailableCarsUseCase'

export class ListAvailableCarsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { category_id, name, brand } = request.query

    const listAvailableCarsUseCase = container.resolve(ListAvailableCarsUseCase)

    const cars = await listAvailableCarsUseCase.run({
      brand: brand as string,
      name: name as string,
      category_id: category_id as string,
    })

    return response.json(cars)
  }
}
