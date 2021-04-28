import { CarsRepositoryMock } from '@modules/cars/repositories/mock/CarsRepositoryMock'
import { SpecificationsRepositoryMock } from '@modules/cars/repositories/mock/SpecificationsRepositoryMock'
import { AppError } from '@shared/errors/AppError'
import { generate } from '@utils/fake'

import { CreateCarUseCase } from '../createCar/CreateCarUseCase'
import { CreateCarSpecificationUseCase } from './CreateCarSpecificationUseCase'

let createCarSpecificationUseCase: CreateCarSpecificationUseCase
let createCarUseCase: CreateCarUseCase
let carsRepository: CarsRepositoryMock
let specificationsRepository: SpecificationsRepositoryMock

describe('Create Car Specification', () => {
  beforeEach(() => {
    carsRepository = new CarsRepositoryMock()
    specificationsRepository = new SpecificationsRepositoryMock()
    createCarUseCase = new CreateCarUseCase(carsRepository)
    createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
      carsRepository,
      specificationsRepository
    )
  })

  it('should be able to add a new specification to the car', async () => {
    const car = await createCarUseCase.run({
      brand: generate(),
      category_id: generate(),
      daily_rate: generate().length,
      description: generate(),
      fine_amount: generate().length,
      license_plate: generate(),
      name: generate(),
    })

    const specification = await specificationsRepository.create({
      description: generate(),
      name: generate(),
    })

    const carWithSpecification = await createCarSpecificationUseCase.run({
      car_id: car.id,
      specifications_id: [specification.id],
    })

    expect(carWithSpecification).toHaveProperty('specifications')
    expect(carWithSpecification.specifications.length).toBe(1)
  })

  it('should not be able to add a new specification to a non-registered car', () => {
    expect(async () => {
      await createCarSpecificationUseCase.run({
        specifications_id: [generate()],
        car_id: generate(),
      })
    }).rejects.toBeInstanceOf(AppError)
  })
})
