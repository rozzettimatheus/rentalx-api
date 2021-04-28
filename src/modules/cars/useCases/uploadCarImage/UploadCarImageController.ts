import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { UploadCarImageUseCase } from './UploadCarImageUseCase'

interface IFiles {
  filename: string
}
export class UploadCarImageUseController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id: car_id } = request.params
    const imageFiles = request.files as IFiles[]

    const uploadCarImageUseCase = container.resolve(UploadCarImageUseCase)

    const images = imageFiles.map(file => file.filename)

    await uploadCarImageUseCase.run({
      car_id,
      images,
    })

    return response.status(201).send()
  }
}
