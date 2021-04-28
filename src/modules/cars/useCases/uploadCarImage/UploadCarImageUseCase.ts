import { inject, injectable } from 'tsyringe'

import { ICarImagesRepository } from '@modules/cars/repositories/ICarImagesRepository'

interface IRequest {
  car_id: string
  images: string[]
}

@injectable()
export class UploadCarImageUseCase {
  constructor(
    @inject('CarImagesRepository')
    private carImagesRepository: ICarImagesRepository
  ) {}

  async run({ images, car_id }: IRequest): Promise<void> {
    images.map(
      async image =>
        await this.carImagesRepository.create({ car_id, image_name: image })
    )
  }
}
