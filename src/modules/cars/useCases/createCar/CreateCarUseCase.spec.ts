import { Car } from '@modules/cars/infra/typeorm/entities/Car'
import { CarsRepositoryMock } from '@modules/cars/repositories/mock/CarsRepositoryMock'
import { AppError } from '@shared/errors/AppError'
import { generate } from '@utils/fake'

import { CreateCarUseCase } from './CreateCarUseCase'

let createCarUseCase: CreateCarUseCase
let carsRepository: CarsRepositoryMock

describe('Registering a car', () => {
  beforeEach(() => {
    carsRepository = new CarsRepositoryMock()
    createCarUseCase = new CreateCarUseCase(carsRepository)
  })

  it('should be able to register a new car', async () => {
    const car = await createCarUseCase.run({
      brand: generate(),
      category_id: generate(),
      daily_rate: generate().length,
      description: generate(),
      fine_amount: generate().length,
      license_plate: generate(),
      name: generate(),
    })

    expect(car).toHaveProperty('id')
  })

  it('should not be able to register a car with an existing license plate', () => {
    const car = {
      brand: generate(),
      category_id: generate(),
      daily_rate: generate().length,
      description: generate(),
      fine_amount: generate().length,
      license_plate: generate(),
      name: generate(),
    }

    expect(async () => {
      await createCarUseCase.run(car)
      await createCarUseCase.run(car)
    }).rejects.toBeInstanceOf(AppError)
  })

  it('expects that a new registered car would be available', async () => {
    const carData = {
      brand: generate(),
      category_id: generate(),
      daily_rate: generate().length,
      description: generate(),
      fine_amount: generate().length,
      license_plate: generate(),
      name: generate(),
    }

    const car = await createCarUseCase.run(carData)

    expect(car.available).toBe(true)
  })
})
