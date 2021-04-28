import { getRepository, Repository } from 'typeorm'

import { ICreateCarDTO } from '@modules/cars/dtos/ICreateCarDTO'
import { IListCarsDTO } from '@modules/cars/dtos/IListCarsDTO'
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository'

import { Car } from '../entities/Car'

export class CarsRepository implements ICarsRepository {
  private repository: Repository<Car>

  constructor() {
    this.repository = getRepository(Car)
  }

  async create(data: ICreateCarDTO): Promise<Car> {
    const car = this.repository.create(data)

    return this.repository.save(car)
  }

  async save(car: Car): Promise<Car> {
    return this.repository.save(car)
  }

  async findByLicensePlate(license_plate: string): Promise<Car> {
    return this.repository.findOne({
      where: {
        license_plate,
      },
    })
  }

  async findById(id: string): Promise<Car> {
    return this.repository.findOne(id)
  }

  async findAllAvailable(data?: IListCarsDTO): Promise<Car[]> {
    const carsQuery = this.repository
      .createQueryBuilder('c')
      .where('available = :available', { available: true })

    if (data && Object.keys(data).length) {
      const { name, brand, category_id } = data

      if (name) carsQuery.andWhere('c.name = :name', { name })

      if (brand) carsQuery.andWhere('c.brand = :brand', { brand })

      if (category_id)
        carsQuery.andWhere('c.category_id = :category_id', { category_id })
    }

    return carsQuery.getMany()
  }
}
