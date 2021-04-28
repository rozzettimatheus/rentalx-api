import { inject, injectable } from 'tsyringe'

import { Rental } from '@modules/rentals/infra/typeorm/entities/Rental'
import { IRentalsRepository } from '@modules/rentals/repositories/IRentalsRepository'
import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider'
import { AppError } from '@shared/errors/AppError'

interface IRequest {
  user_id: string
  car_id: string
  expected_return_date: Date
}

@injectable()
export class CreateRentalUseCase {
  private readonly MINIMUM_DEVOLUTION_HOURS = 24

  constructor(
    @inject('RentalsRepository')
    private rentalsRepository: IRentalsRepository,
    @inject('DateProvider')
    private dateProvider: IDateProvider
  ) {}

  async run({
    user_id,
    car_id,
    expected_return_date,
  }: IRequest): Promise<Rental> {
    const carInUse = await this.rentalsRepository.findOpenRentalsByCar(car_id)

    if (carInUse)
      throw new AppError('Car is unavailable for rental this moment')

    const userWithOpenCarRental = await this.rentalsRepository.findOpenRentalsByUser(
      user_id
    )

    if (userWithOpenCarRental)
      // HTTP 409 - Conflict
      throw new AppError('There is a rental in progress by this user', 409)

    const now = this.dateProvider.getNow()
    const compare = this.dateProvider.getHoursDiff({
      start_date: now,
      end_date: expected_return_date,
    })

    console.log(compare)

    if (compare < this.MINIMUM_DEVOLUTION_HOURS) {
      throw new AppError('The returning time must be at least 24 hours later')
    }

    return this.rentalsRepository.create({
      user_id,
      car_id,
      expected_return_date,
    })
  }
}
