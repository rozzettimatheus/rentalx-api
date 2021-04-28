import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { CreateRentalUseCase } from './CreateRentalUseCase'

export class CreateRentalController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id: user_id } = request.user
    const { expected_return_date, car_id } = request.body

    const createRentalUseCase = container.resolve(CreateRentalUseCase)

    const rental = await createRentalUseCase.run({
      car_id,
      expected_return_date,
      user_id,
    })

    return response.status(201).json(rental)
  }
}
