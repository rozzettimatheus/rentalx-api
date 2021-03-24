import { Request, Response } from 'express'

import { CreateSpecificationUseCase } from './CreateSpecificationUseCase'

class CreateSpecificationController {
  constructor(private createSpecificationUseCase: CreateSpecificationUseCase) {}
  handle(request: Request, response: Response): Response {
    const { name, description } = request.body

    try {
      this.createSpecificationUseCase.run({ name, description })
    } catch (err) {
      return response.status(400).json({ error: err.message })
    }

    return response.status(201).send()
  }
}

export { CreateSpecificationController }
