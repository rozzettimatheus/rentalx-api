import { CarsRepositoryMock } from '@modules/cars/repositories/mock/CarsRepositoryMock'
import { generate } from '@utils/fake'

import { ListAvailableCarsUseCase } from './ListAvailableCarsUseCase'

let carsRepository: CarsRepositoryMock
let listCarsUseCase: ListAvailableCarsUseCase

describe('List Cars', () => {
  beforeEach(() => {
    carsRepository = new CarsRepositoryMock()
    listCarsUseCase = new ListAvailableCarsUseCase(carsRepository)
  })

  it('should be able to list all available cars', async () => {
    const car = await carsRepository.create({
      name: generate(),
      brand: generate(),
      category_id: generate(),
      daily_rate: generate().length,
      description: generate(),
      fine_amount: generate().length,
      license_plate: generate(),
    })

    // unavailable cars?

    const cars = await listCarsUseCase.run({})

    expect(cars).toEqual([car])
  })

  it('should be able to list all available cars by name', async () => {
    const name = generate()

    const car = await carsRepository.create({
      name,
      brand: generate(),
      category_id: generate(),
      daily_rate: generate().length,
      description: generate(),
      fine_amount: generate().length,
      license_plate: generate(),
    })

    await carsRepository.create({
      name: generate(),
      brand: generate(),
      category_id: generate(),
      daily_rate: generate().length,
      description: generate(),
      fine_amount: generate().length,
      license_plate: generate(),
    })

    const cars = await carsRepository.findAllAvailable({ name })

    expect(cars).toEqual([car])
  })

  it('should be able to list all available cars by brand', async () => {
    const brand = generate()

    const car = await carsRepository.create({
      name: generate(),
      brand,
      category_id: generate(),
      daily_rate: generate().length,
      description: generate(),
      fine_amount: generate().length,
      license_plate: generate(),
    })

    await carsRepository.create({
      name: generate(),
      brand: generate(),
      category_id: generate(),
      daily_rate: generate().length,
      description: generate(),
      fine_amount: generate().length,
      license_plate: generate(),
    })

    const cars = await carsRepository.findAllAvailable({ brand })

    expect(cars).toEqual([car])
  })

  it('should be able to list all available cars by category_id', async () => {
    const category_id = generate()

    const car = await carsRepository.create({
      name: generate(),
      brand: generate(),
      category_id,
      daily_rate: generate().length,
      description: generate(),
      fine_amount: generate().length,
      license_plate: generate(),
    })

    await carsRepository.create({
      name: generate(),
      brand: generate(),
      category_id: generate(),
      daily_rate: generate().length,
      description: generate(),
      fine_amount: generate().length,
      license_plate: generate(),
    })

    const cars = await carsRepository.findAllAvailable({ category_id })

    expect(cars).toEqual([car])
  })

  // cannot list with a non-existing category_id
})
