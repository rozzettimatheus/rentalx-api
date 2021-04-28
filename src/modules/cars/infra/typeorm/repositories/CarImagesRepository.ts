import { getRepository, Repository } from 'typeorm'

import { ICreateCarImageDTO } from '@modules/cars/dtos/ICreateCarImageDTO'
import { ICarImagesRepository } from '@modules/cars/repositories/ICarImagesRepository'

import { CarImage } from '../entities/CarImage'

export class CarImagesRepository implements ICarImagesRepository {
  private repository: Repository<CarImage>

  constructor() {
    this.repository = getRepository(CarImage)
  }

  create({ car_id, image_name }: ICreateCarImageDTO): Promise<CarImage> {
    const car_image = this.repository.create({
      car_id,
      image_name,
    })

    return this.repository.save(car_image)
  }
}
