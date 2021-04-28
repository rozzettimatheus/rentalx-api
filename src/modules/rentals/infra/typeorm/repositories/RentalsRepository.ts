import { getRepository, Repository } from 'typeorm'

import { ICreateRentalDTO } from '@modules/rentals/dtos/ICreateRentalDTO'
import { IRentalsRepository } from '@modules/rentals/repositories/IRentalsRepository'

import { Rental } from '../entities/Rental'

export class RentalsRepository implements IRentalsRepository {
  private repository: Repository<Rental>

  constructor() {
    this.repository = getRepository(Rental)
  }

  async findOpenRentalsByCar(car_id: string): Promise<Rental> {
    return this.repository.findOne({ car_id })
  }

  async findOpenRentalsByUser(user_id: string): Promise<Rental> {
    return this.repository.findOne({ user_id })
  }

  async create(data: ICreateRentalDTO): Promise<Rental> {
    const rental = this.repository.create({ ...data })

    return this.repository.save(rental)
  }
}
