import { ICreateCarDTO } from '@modules/cars/dtos/ICreateCarDTO'
import { IListCarsDTO } from '@modules/cars/dtos/IListCarsDTO'
import { Car } from '@modules/cars/infra/typeorm/entities/Car'

import { ICarsRepository } from '../ICarsRepository'

export class CarsRepositoryMock implements ICarsRepository {
  private cars: Car[] = []

  async create(data: ICreateCarDTO): Promise<Car> {
    const car = new Car()
    Object.assign(car, data)

    this.cars.push(car)

    return car
  }

  async findByLicensePlate(license_plate: string): Promise<Car> {
    return this.cars.find(car => car.license_plate === license_plate)
  }

  async findAllAvailable(data?: IListCarsDTO): Promise<Car[]> {
    const cars = this.cars.filter(car => car.available)

    return data && Object.keys(data).length
      ? cars.filter(
          car =>
            (data.name && car.name === data.name) ||
            (data.brand && car.brand === data.brand) ||
            (data.category_id && car.category_id === data.category_id)
        )
      : cars
  }

  async findById(id: string): Promise<Car> {
    return this.cars.find(car => car.id === id)
  }

  async save(car: Car): Promise<Car> {
    const idx = this.cars.findIndex(c => c.id === car.id)

    this.cars[idx] = car

    return car
  }
}
