import { inject, injectable } from 'tsyringe'

import { Car } from '@modules/cars/infra/typeorm/entities/Car'
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository'
import { AppError } from '@shared/errors/AppError'

interface IRequest {
  name: string
  description: string
  daily_rate: number
  license_plate: string
  fine_amount: number
  brand: string
  category_id: string
}

@injectable()
export class CreateCarUseCase {
  constructor(
    @inject('CarsRepository')
    private repository: ICarsRepository
  ) {}

  async run({ license_plate, ...data }: IRequest): Promise<Car> {
    const existingCar = await this.repository.findByLicensePlate(license_plate)

    if (existingCar) {
      // HTTP 409 - conflict
      throw new AppError('Car already registered', 409)
    }

    return this.repository.create({ license_plate, ...data })
  }
}
